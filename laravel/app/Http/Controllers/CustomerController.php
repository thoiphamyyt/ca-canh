<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Exception;

class CustomerController extends Controller
{
    public function getAll()
    {
        $data = User::all();
        return response()->json([
            'status' => 200,
            'message' => 'Lấy danh sách khách hàng thành công',
            'data' => $data
        ]);
    }

    public function getDetail($id)
    {
        try {
            $customer = User::find($id);
            if (!$customer) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy khách hàng',
                    'success' => false
                ], 404);
            }
            return response()->json([
                'status' => 200,
                'message' => 'Lấy thông tin khách hàng thành công',
                'data' => $customer,
                'success' => true
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi server: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }
    public function create(Request $request)
    {
        try {
            $formData = $request->all();
            $valid = Validator::make($formData, [
                'userName' => 'required|string',
                'name' => 'required|string',
                'email' => 'nullable|string|email',
                'password' => 'required|string|min:6',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $checkUser = User::where('userName', $request->userName)->first();
            if ($checkUser) {
                return response()->json([
                    'status' => 409,
                    'message' => 'Tên đăng nhập đã tồn tại',
                ], 409);
            }

            $customer = User::create([
                'name' => $request->name,
                'userName' => $request->userName,
                'address' => $request->address,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'user'
            ]);

            return response()->json([
                'status' => 201,
                'success' => true,
                'data' => $customer
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $formData = $request->all();
            $valid = Validator::make($formData, [
                'name' => 'required|string',
                'email' => 'nullable|string|email',
                'password' => 'nullable|string|min:6',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $customer = User::find($id);
            if (!$customer) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy khách hàng',
                    'success' => false
                ], 404);
            }

            if (isset($formData['name'])) {
                $customer->name = $formData['name'];
            }
            if (isset($formData['address'])) {
                $customer->address = $formData['address'];
            }
            if (isset($formData['phone'])) {
                $customer->phone = $formData['phone'];
            }
            if (isset($formData['email'])) {
                $customer->email = $formData['email'];
            }
            if (isset($formData['password']) && !empty($formData['password'])) {
                $customer->password = Hash::make($request->password);
            }
            $customer->save();

            return response()->json([
                'status' => 200,
                'message' => 'Cập nhật khách hàng thành công',
                'data' => $customer,
                'success' => true
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi server: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }
}
