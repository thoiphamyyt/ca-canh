<?php

namespace App\Guards;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtCookieGuard implements Guard
{
    protected $request;
    protected $provider;
    protected $user;

    public function __construct(UserProvider $provider, Request $request)
    {
        $this->provider = $provider;
        $this->request = $request;
    }

    public function check(): bool
    {
        return $this->user() !== null;
    }

    public function guest(): bool
    {
        return ! $this->check();
    }

    public function user()
    {
        if ($this->user) {
            return $this->user;
        }

        try {
            // Lấy token từ header Authorization
            $authHeader = $this->request->header('Authorization');
            $token = null;

            if ($authHeader && preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
                $token = $matches[1];
            }

            // Nếu không có trong header thì lấy từ cookie
            if (! $token && $this->request->cookie('access_token')) {
                $token = $this->request->cookie('access_token');
            }

            if ($token) {
                $this->user = JWTAuth::setToken($token)->authenticate();
            } else {
                $this->user = null;
            }
        } catch (\Exception $e) {
            $this->user = null;
        }

        return $this->user;
    }

    public function id(): ?int
    {
        return $this->user() ? $this->user()->getAuthIdentifier() : null;
    }

    public function validate(array $credentials = []): bool
    {
        return $this->check();
    }

    public function hasUser(): bool
    {
        return $this->user !== null;
    }

    public function setUser(Authenticatable $user)
    {
        $this->user = $user;
        return $this;
    }
}
