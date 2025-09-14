<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Guards\JwtCookieGuard;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Đăng ký guard jwt-cookie
        Auth::extend('jwt-cookie', function ($app, $name, array $config) {
            return new \App\Guards\JwtCookieGuard(
                Auth::createUserProvider($config['provider']),
                $app['request']
            );
        });
    }
}
