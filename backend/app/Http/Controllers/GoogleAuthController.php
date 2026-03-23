<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    private const FRONTEND_URL_COOKIE = 'oauth_frontend_url';

    private function frontendUrl(): string
    {
        return rtrim(config('app.frontend_url', 'http://127.0.0.1:5500/front-end'), '/');
    }

    private function resolveFrontendUrl(?string $candidate = null): string
    {
        $fallback = $this->frontendUrl();

        if (empty($candidate)) {
            return $fallback;
        }

        $parsedUrl = parse_url($candidate);
        $fallbackHost = parse_url($fallback, PHP_URL_HOST);

        if (! is_array($parsedUrl)) {
            return $fallback;
        }

        $scheme = $parsedUrl['scheme'] ?? null;
        $host = $parsedUrl['host'] ?? null;

        if (! in_array($scheme, ['http', 'https'], true) || empty($host)) {
            return $fallback;
        }

        $allowedHosts = array_filter([$fallbackHost, 'localhost', '127.0.0.1']);

        if (! in_array($host, $allowedHosts, true)) {
            return $fallback;
        }

        $path = isset($parsedUrl['path']) ? rtrim($parsedUrl['path'], '/') : '';
        $port = isset($parsedUrl['port']) ? ':' . $parsedUrl['port'] : '';

        return "{$scheme}://{$host}{$port}{$path}";
    }

    private function frontendRedirectResponse(string $path, array $query = []): RedirectResponse
    {
        $frontendUrl = $this->resolveFrontendUrl(request()->cookie(self::FRONTEND_URL_COOKIE));
        $separator = empty($query) ? '' : '?' . http_build_query($query);

        return redirect("{$frontendUrl}/{$path}{$separator}")
            ->withCookie(Cookie::forget(self::FRONTEND_URL_COOKIE));
    }

    private function redirectUri(): string
    {
        return config('services.google.redirect', 'http://localhost:8000/google/callback');
    }

    /**
     * Redirect to Google for authentication
     */
    public function redirectToGoogle(Request $request)
    {
        $scopes = [
            'openid',
            'profile', 
            'email'
        ];

        $frontendUrl = $this->resolveFrontendUrl($request->query('frontend_url'));
        
        return Socialite::driver('google')
            ->redirectUrl($this->redirectUri())
            ->scopes($scopes)
            ->redirect()
            ->withCookie(cookie(
                self::FRONTEND_URL_COOKIE,
                $frontendUrl,
                10,
                '/',
                null,
                false,
                false,
                false,
                'Lax'
            ));
    }

    /**
     * Handle Google callback
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->redirectUrl($this->redirectUri())
                ->stateless()
                ->user();

            if (empty($googleUser->email)) {
                return $this->frontendRedirectResponse('login.html', [
                    'error' => 'Email Google tidak ditemukan',
                ]);
            }

            // Find or create user by email or google_id
            $user = User::where('email', $googleUser->email)
                       ->orWhere('google_id', $googleUser->id)
                       ->first();

            if ($user) {
                // Link Google ID and update profile
                $user->update([
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                    'avatar' => $googleUser->avatar ?? $user->avatar,
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'avatar' => $googleUser->avatar,
                    'password' => Hash::make(Str::random(64)),
                ]);
            }

            // Generate secure token (7-day expiry, SPA abilities)
            $token = $user->createToken('auth-token', ['*'], now()->addDays(7))->plainTextToken;

            // Secure redirect to frontend
            return $this->frontendRedirectResponse('index.html', [
                'token' => $token,
                'success' => 'true',
                'provider' => 'google',
            ]);

        } catch (\Exception $e) {
            \Log::error('Google OAuth error: ' . $e->getMessage());
            return $this->frontendRedirectResponse('login.html', [
                'error' => 'Google authentication failed',
            ]);
        }
    }
}
