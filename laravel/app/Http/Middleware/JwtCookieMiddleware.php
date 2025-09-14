<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

class JwtCookieMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Nếu header Authorization đã có thì không làm lại
        if (!$request->bearerToken() && $request->hasCookie('access_token')) {
            $token = $request->cookie('access_token');

            // 1) Set header Authorization để auth:api có thể đọc
            $request->headers->set('Authorization', 'Bearer ' . $token);

            // 2) Try authenticate ngay lập tức bằng JWTAuth, và gán user cho guard 'api'
            try {
                $user = JWTAuth::setToken($token)->authenticate(); // trả về user hoặc throw
                if ($user) {
                    // gán user vào guard 'api' (và default)
                    auth('api')->setUser($user);
                    auth()->setUser($user);
                }
            } catch (JWTException $e) {
                Log::error('JWT cookie auth failed: ' . $e->getMessage());
                return response()->json(['error' => 'Unauthenticated - invalid token'], 401);
            } catch (\Exception $e) {
                Log::error('JWT cookie unknown error: ' . $e->getMessage());
                return response()->json(['error' => 'Unauthenticated - token error'], 401);
            }
        }

        // debug log (xóa khi OK)
        Log::info('JwtCookieMiddleware - Authorization header: ' . $request->header('Authorization'));

        return $next($request);
    }
}
