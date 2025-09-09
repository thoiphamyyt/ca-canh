<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function index()
    {

        $users = DB::table('users')->get()->toArray();
        return view('welcome');
    }
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
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'success' => true], 201);
    }

    public function login(Request $request)
    {
        $formData = $request->all();
        $valid = Validator::make($formData, [
            'userName' => 'required|string|min:6',
            'password' => 'required|string|min:6',
        ]);
        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()], 422);
        }
        $user = User::where('userName', $formData['userName'])->first();

        if ($user && Hash::check($formData['password'], $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            $info = [
                'name' => $user->name,
                'userName' => $user->userName,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
            ];
            return response()->json(['message' => 'Đăng nhập thành công.', 'success' => true, '_token' => $token, 'user' => $info], 201);
        }

        return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác, vui lòng kiểm tra lại.', 'success' => false], 201);
    }

    public function logout(Request $request)
    {
        // Nếu bạn dùng Sanctum hoặc Passport thì revoke token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
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
            if ($user->avatar && Storage::disk('public/user')->exists($user->avatar)) {
                Storage::disk('public/user')->delete($user->avatar);
            }
            // Lưu ảnh mới vào storage/app/public/avatars
            $path = $request->file('avatar')->store('user', 'public');
            $user->avatar = $path; // VD: avatars/abc123.jpg
        }

        $user->save();

        return response()->json(['message' => 'Cập nhật tài khoản thành công.', 'user' => $user, 'success' => true], 200);
    }
}
