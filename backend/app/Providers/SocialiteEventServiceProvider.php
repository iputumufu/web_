<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SocialiteEventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Facebook SocialiteProviders event listener
        \SocialiteProviders\Manager\SocialiteWasCalled::listen(function ($socialite, $driverName) {
            if ($driverName === 'facebook') {
                $socialite->setConfig([
                    'redirect' => config('services.facebook.redirect')
                ]);
            }
        });
    }
}
