<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class FacebookAuthController extends Controller
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
        return config('services.facebook.redirect', 'http://localhost:8000/facebook/callback');
    }

    /**
     * Redirect to Facebook for authentication (stateless for SPA)
     */
    public function redirectToFacebook(Request $request)
    {
        $scopes = ['email', 'public_profile'];

        $frontendUrl = $this->resolveFrontendUrl($request->query('frontend_url'));
        
        return Socialite::driver('facebook')
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
     * Handle Facebook callback (stateless)
     */
    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')
                ->redirectUrl($this->redirectUri())
                ->stateless()
                ->user();

            if (empty($facebookUser->getEmail())) {
                return $this->frontendRedirectResponse('login.html', [
                    'error' => 'Email Facebook tidak ditemukan',
                ]);
            }

            $email = User::normalizeEmail($facebookUser->getEmail());

            // Find or create user by email or facebook_id
            $user = User::where('email', $email)
                       ->orWhere('facebook_id', $facebookUser->getId())
                       ->first();

            if ($user) {
                // Link Facebook ID and update profile if needed
                $user->update([
                    'facebook_id' => $facebookUser->getId(),
                    'email' => $email,
                    'avatar' => $facebookUser->getAvatar() ?? $user->avatar,
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $facebookUser->getName(),
                    'email' => $email,
                    'facebook_id' => $facebookUser->getId(),
                    'avatar' => $facebookUser->getAvatar(),
                    'password' => Hash::make(Str::random(64)),
                    'role' => User::resolveRoleForEmail($email),
                    'is_verified' => User::shouldReceiveVerifiedBadge($email),
                    'email_verified_at' => User::shouldReceiveVerifiedBadge($email) ? now() : null,
                ]);
            }

            $user->syncAccountAttributesFromEmail();

            // Generate secure token (7-day expiry)
            $token = $user->createToken('auth-token', ['*'], now()->addDays(7))->plainTextToken;

            // Secure redirect to frontend
            return $this->frontendRedirectResponse('index.html', [
                'token' => $token,
                'success' => 'true',
                'provider' => 'facebook',
            ]);

        } catch (InvalidStateException $e) {
            \Log::error('Facebook OAuth state mismatch: ' . $e->getMessage());
            return $this->frontendRedirectResponse('login.html', [
                'error' => 'Invalid OAuth state',
            ]);
        } catch (\Exception $e) {
            \Log::error('Facebook auth error: ' . $e->getMessage());
            return $this->frontendRedirectResponse('login.html', [
                'error' => 'Facebook authentication failed',
            ]);
        }
    }
}
