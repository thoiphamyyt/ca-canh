<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
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
    public function getOrders(Request $request)
    {
        try {
            $user = auth('api')->user();
            $orders = Order::with('items.product')
                ->where('user_id', $user->id)
                ->get();
            return response()->json([
                'data' => $orders,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'content' => 'Không lấy được dữ liệu, vui lòng thử lại sau.'
            ], 500);
        }
    }
    public function getAll()
    {
        $orders = Order::with(['items.product', 'user'])->get();
        if ($orders) {
            return response()->json([
                'data' => $orders,
                'success' => true
            ]);
        } else {
            return response()->json([
                'content' => 'No data',
                'success' => false
            ]);
        }
    }

    public function detail($id)
    {
        $order = Order::with(['user', 'items.product'])->findOrFail($id);

        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order = Order::with(['user', 'items.product'])->findOrFail($id);
        $order->status = $request->status;
        $order->save();
        if ($request->status == "processing") {
            foreach ($order->items as $item) {
                $product = $item->product;
                if ($product) {
                    if ($product->quantity < $item->quantity) {
                        return response()->json([
                            'success' => false,
                            'message' => "Sản phẩm {$product->name} không đủ số lượng tồn kho.",
                        ], 400);
                    }

                    $product->quantity -= $item->quantity;
                    $product->save();
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Trạng thái đơn hàng đã được cập nhật',
            'order' => $order
        ]);
    }
}
