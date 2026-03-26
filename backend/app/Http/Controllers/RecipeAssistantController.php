<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Throwable;

class RecipeAssistantController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:2000'],
            'history' => ['nullable', 'array', 'max:12'],
            'history.*.role' => ['required_with:history', 'string', 'in:user,assistant'],
            'history.*.content' => ['required_with:history', 'string', 'max:2000'],
        ]);

        $apiKey = config('services.openrouter.api_key');

        if (! $apiKey) {
            return response()->json([
                'message' => 'OPENROUTER_API_KEY belum dikonfigurasi di backend.',
            ], 503);
        }

        $messages = $this->buildMessages($validated['message'], $validated['history'] ?? []);
        $models = config('services.openrouter.models', []);

        if (! is_array($models) || $models === []) {
            return response()->json([
                'message' => 'Daftar model OpenRouter belum dikonfigurasi.',
            ], 503);
        }

        $lastErrorMessage = 'Permintaan ke layanan AI gagal diproses.';
        $lastStatusCode = 502;

        foreach ($models as $model) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer '.$apiKey,
                    'HTTP-Referer' => config('app.url'),
                    'X-Title' => config('app.name', 'Masak Yuk').' Recipe Assistant',
                ])->timeout(30)->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => $model,
                    'messages' => $messages,
                    'temperature' => 0.7,
                    'max_tokens' => 500,
                ]);
            } catch (Throwable $exception) {
                report($exception);
                $lastErrorMessage = 'Gagal terhubung ke layanan AI.';
                $lastStatusCode = 502;

                continue;
            }

            if ($response->failed()) {
                $lastErrorMessage = data_get($response->json(), 'error.message', 'Permintaan ke layanan AI gagal diproses.');
                $lastStatusCode = $response->status();

                if ($this->shouldTryNextModel($lastErrorMessage)) {
                    continue;
                }

                return response()->json([
                    'message' => $lastErrorMessage,
                ], $lastStatusCode);
            }

            $reply = data_get($response->json(), 'choices.0.message.content');

            if (is_string($reply) && trim($reply) !== '') {
                return response()->json([
                    'reply' => trim($reply),
                ]);
            }

            $lastErrorMessage = 'Balasan AI tidak valid.';
            $lastStatusCode = 502;
        }

        return response()->json([
            'message' => $lastErrorMessage,
        ], $lastStatusCode);
    }

    /**
     * @param  array<int, array{role:string, content:string}>  $history
     * @return array<int, array{role:string, content:string}>
     */
    private function buildMessages(string $message, array $history): array
    {
        $sanitizedHistory = Collection::make($history)
            ->take(-8)
            ->map(fn (array $item) => [
                'role' => $item['role'],
                'content' => trim($item['content']),
            ])
            ->filter(fn (array $item) => $item['content'] !== '')
            ->values()
            ->all();

        return [
            [
                'role' => 'system',
                'content' => implode("\n", [
                    'Kamu adalah customer service Masak Yuk.',
                    'Fokusmu membantu pengguna soal resep makanan, ide menu, pengganti bahan, teknik memasak, takaran, lama memasak, dan penyajian.',
                    'Gunakan bahasa Indonesia yang ramah, singkat, dan praktis.',
                    'Jika informasi pengguna kurang lengkap, ajukan pertanyaan lanjutan yang relevan.',
                    'Jangan mengaku sebagai dokter atau ahli gizi. Untuk alergi, keamanan makanan, atau kondisi medis, sarankan konsultasi profesional.',
                    'Selalu beri jawaban yang langsung bisa dipakai di dapur.',
                ]),
            ],
            ...$sanitizedHistory,
            [
                'role' => 'user',
                'content' => trim($message),
            ],
        ];
    }

    private function shouldTryNextModel(string $message): bool
    {
        $normalized = strtolower($message);

        return str_contains($normalized, 'no endpoints found')
            || str_contains($normalized, 'model not found')
            || str_contains($normalized, 'provider returned error');
    }
}
