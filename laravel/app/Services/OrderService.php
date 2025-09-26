<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Shipping;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder($user, array $data)
    {
        return DB::transaction(function () use ($user, $data) {
            // 1. Tạo Order
            $order = Order::create([
                'user_id' => $user->id,
                'order_date' => now(),
                'status' => 'pending',
                'total_amount' => 0, // sẽ tính sau
                'shipping_address' => $user->address,
                'payment_method' => $data['payment_method'],
            ]);

            $total = 0;

            // 2. Thêm OrderItems
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

            // 3. Cập nhật tổng tiền
            $order->update(['total_amount' => $total]);

            // 4. Tạo Payment
            $payment = Payment::create([
                'order_id' => $order->id,
                'payment_date' => now(),
                'amount' => $total,
                'method' => $data['payment_method'],
                'status' => 'pending',
            ]);
            return [
                'order' => $order,
                'payment' => $payment,
            ];
        });
    }
}
