<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Shipping;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder($user, array $data)
    {
        $checkQuantity = $this->checkQuantity($data);
        if (!$checkQuantity['success']) {
            return $checkQuantity;
        }
        return DB::transaction(function () use ($user, $data) {
            $order = Order::create([
                'user_id' => $user->id,
                'order_date' => now(),
                'status' => 'pending',
                'total_amount' => 0,
                'shipping_address' => $user->address,
                'payment_method' => $data['payment_method'],
            ]);

            $total = 0;

            foreach ($data['items'] as $item) {
                $subtotal = $item['price'] * $item['quantityCart'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantityCart'],
                    'price' => $item['price'],
                ]);
            }

            $order->update(['total_amount' => $total]);
            $payment = Payment::create([
                'order_id' => $order->id,
                'payment_date' => now(),
                'amount' => $total,
                'method' => $data['payment_method'],
                'status' => 'pending',
            ]);
            return [
                'success' => true,
                'order' => $order,
                'payment' => $payment,
            ];
        });
    }
    public function checkQuantity($data)
    {
        foreach ($data['items'] as $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                return ['success' => false, 'message' => "Sản phẩm ID {$item['id']} không tồn tại"];
            }
            if ($product->quantity < $item['quantityCart']) {
                return ['success' => false, 'message' => "Số lượng sản phẩm ID {$item['id']} không đủ trong kho"];
            }
        }
        return ['success' => true];
    }
}
