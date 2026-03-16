<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google for authentication
     */
    public function redirectToGoogle()
    {
        $scopes = [
            'openid',
            'profile', 
            'email'
        ];
        
        return Socialite::driver('google')
            ->scopes($scopes)
            ->stateless()
            ->redirect();
    }

    /**
     * Handle Google callback
     */
    public function handleGoogleCallback()
    {
        try {
$googleUser = Socialite::driver('google')->stateless()->user();

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
            $frontendUrl = config('app.frontend_url', 'http://localhost:5500');
            return redirect("{$frontendUrl}/index.html?token={$token}&success=true&provider=google");

        } catch (\Exception $e) {
            \Log::error('Google OAuth error: ' . $e->getMessage());
            $frontendUrl = config('app.frontend_url', 'http://localhost:5500');
            return redirect("{$frontendUrl}/login.html?error=".urlencode($e->getMessage()));
        }
    }
}
