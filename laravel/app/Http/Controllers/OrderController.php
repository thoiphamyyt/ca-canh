<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use Exception;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function store(Request $request)
    {

        try {
            $data = $request->all();
            $valid = Validator::make($data, [
                'payment_method' => 'required|in:cod,bank,momo',
                'items' => 'required|array|min:1',
                'items.*.id' => 'required|integer|exists:products,id',
                'items.*.quantityCart' => 'required|integer|min:1',
                'items.*.price' => 'required|numeric|min:0',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $user = auth('api')->user();

            $result = $this->orderService->createOrder($user, $data);

            return response()->json([
                'message' => 'Order created successfully',
                'success' => true,
                'order' => $result['order'],
                'payment' => $result['payment'],
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'content' => 'Xảy ra lỗi trong quá trình xử lý đơn hàng.'
            ], 500);
        }
    }
}
