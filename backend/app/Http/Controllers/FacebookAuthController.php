<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class FacebookAuthController extends Controller
{
    /**
     * Redirect to Facebook for authentication (stateless for SPA)
     */
    public function redirectToFacebook()
    {
        $scopes = ['email', 'public_profile'];
        
        return Socialite::driver('facebook')
            ->scopes($scopes)
            ->stateless()
            ->redirect();
    }

    /**
     * Handle Facebook callback (stateless)
     */
    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            // Find or create user by email or facebook_id
            $user = User::where('email', $facebookUser->getEmail())
                       ->orWhere('facebook_id', $facebookUser->getId())
                       ->first();

            if ($user) {
                // Link Facebook ID and update profile if needed
                $user->update([
                    'facebook_id' => $facebookUser->getId(),
                    'avatar' => $facebookUser->getAvatar() ?? $user->avatar,
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $facebookUser->getName(),
                    'email' => $facebookUser->getEmail(),
                    'facebook_id' => $facebookUser->getId(),
                    'avatar' => $facebookUser->getAvatar(),
                    'password' => Hash::make(Str::random(64)),
                ]);
            }

            // Generate secure token (7-day expiry)
            $token = $user->createToken('auth-token', ['*'], now()->addDays(7))->plainTextToken;

            // Secure redirect to frontend
            $frontendUrl = config('app.frontend_url', 'http://127.0.0.1:5500/front-end');
            return redirect("{$frontendUrl}/login.html?token={$token}&success=true&provider=facebook");

        } catch (InvalidStateException $e) {
            \Log::error('Facebook OAuth state mismatch: ' . $e->getMessage());
            $frontendUrl = config('app.frontend_url', 'http://127.0.0.1:5500/front-end');
            return redirect("{$frontendUrl}/login.html?error=Invalid+OAuth+state");
        } catch (\Exception $e) {
            \Log::error('Facebook auth error: ' . $e->getMessage());
            $frontendUrl = config('app.frontend_url', 'http://127.0.0.1:5500/front-end');
            return redirect("{$frontendUrl}/login.html?error=Facebook+authentication+failed");
        }
    }
}

