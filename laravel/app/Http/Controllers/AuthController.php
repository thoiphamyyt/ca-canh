<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $formData = $request->all();
        $valid = Validator::make($formData, [
            'userName' => 'required|string|min:6',
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|numeric|digits_between:10,11',
            'password' => 'required|string|min:6',
        ]);
        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()], 422);
        }
        $getUser = User::where('userName', $formData['userName'])->first();
        if ($getUser) {
            return response()->json(['message' => 'Tên đăng nhập đã tồn tại.', 'success' => false], 409);
        }
        $user = User::create([
            'name' => $formData['name'],
            'userName' => $formData['userName'],
            'email' => @$formData['email'],
            'address' => $formData['address'] ?? null,
            'phone' => $formData['phone'] ?? null,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'success' => true], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('userName', 'password');

        $valid = Validator::make($credentials, [
            'userName' => 'required|string|min:6',
            'password' => 'required|string|min:6',
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()], 422);
        }

        // Thử xác thực user bằng JWT
        if (!$token = JWTAuth::attempt(['userName' => $credentials['userName'], 'password' => $credentials['password']])) {
            return response()->json([
                'message' => 'Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng kiểm tra lại.',
                'success' => false
            ], 401);
        }

        $user = auth()->user();

        $info = [
            'name' => $user->name,
            'userName' => $user->userName,
            'email' => $user->email,
            'phone' => $user->phone,
            'address' => $user->address,
            'role' => $user->role,
        ];

        return response()
            ->json([
                'success' => true,
                'message' => 'Đăng nhập thành công',
                'user' => $info,
            ])
            ->cookie(
                'access_token',  // tên cookie
                $token,          // JWT token
                60,              // thời gian sống (phút)
                '/',             // path
                null,            // domain (null = auto theo backend host, localhost ok)
                false,           // secure = false khi chạy localhost
                true,            // httponly
                false,           // raw
                'Lax'            // SameSite = Lax để tránh bị drop
            );
    }

    public function userMe()
    {
        return response()->json(['success' => true, 'user' => auth('api')->user()], 200);
    }


    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (\Exception $e) {
        }

        return response()->json(['message' => 'Logged out'])
            ->cookie('access_token', null, -1, '/');
    }

    public function update(Request $request)
    {
        $formData = $request->post();
        $user = Auth::user();
        $valid = Validator::make($formData, [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|numeric|digits_between:10,11',
            'address' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()], 422);
        }

        if (!$user) {
            return response()->json(['message' => 'Tài khoản không có quyền cập nhật user.', 'success' => false], 404);
        }

        if (isset($formData['name'])) {
            $user->name = $formData['name'];
        }
        if (isset($formData['email'])) {
            $user->email = $formData['email'];
        }
        if (isset($formData['phone'])) {
            $user->phone = $formData['phone'];
        }
        if (isset($formData['address'])) {
            $user->address = $formData['address'];
        }
        if (!empty($formData['password'])) {
            $user->password = Hash::make($formData['password']);
        }
        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('user', 'public');
            $user->avatar = $path;
        }

        $user->save();

        return response()->json(['message' => 'Cập nhật tài khoản thành công.', 'user' => $user, 'success' => true], 200);
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Đã gửi email đặt lại mật khẩu!', 'success' => true])
            : response()->json(['message' => 'Không tìm thấy người dùng!', 'success' => false], 404);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Đặt lại mật khẩu thành công!', 'success' => true])
            : response()->json(['message' => 'Token không hợp lệ hoặc hết hạn!', 'success' => false], 400);
    }
}
