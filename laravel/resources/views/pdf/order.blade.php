<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Hóa đơn #{{ $order->id }}</title>
    <style>
        @page {
            margin: 40px 40px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 13px;
            color: #333;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #4A90E2;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #4A90E2;
        }

        .invoice-title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #222;
            margin-top: 10px;
            text-transform: uppercase;
        }

        .info {
            margin-top: 20px;
        }

        .info p {
            margin: 4px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th {
            background: #f1f5f9;
            color: #333;
            text-align: left;
        }

        th,
        td {
            border: 1px solid #d1d5db;
            padding: 8px;
        }

        tfoot td {
            font-weight: bold;
        }

        .total {
            text-align: right;
            font-size: 15px;
            font-weight: bold;
            margin-top: 10px;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }

        .sign {
            width: 100%;
            margin: 40px 0;
            text-align: center;
            border: none;
        }

        .sign td {
            width: 50%;
            vertical-align: top;
            padding-top: 40px;
            border: none;
        }

        .qr {
            text-align: right;
            margin-top: 15px;
        }
    </style>
</head>

<body>

    <div class="header">
        <div class="logo"><img src="{{ public_path('images/logo.png') }}" width="120" /> </div>
        <div class="company-info" style="text-align: right;">
            <strong>Shop Cá cảnh Trà Vinh</strong><br>
            Ấp Tân Thành Tây, Tân Hòa, Vĩnh Long<br>
            Hotline: 0123 456 789<br>
            Email: cacanhTV@gmail.vn
        </div>
    </div>

    <h2 class="invoice-title">HÓA ĐƠN BÁN HÀNG</h2>

    <div class="info">
        <p><strong>Mã đơn hàng:</strong> #{{ $order->id }}</p>
        <p><strong>Ngày đặt:</strong> {{ \Carbon\Carbon::parse($order->order_date)->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i') }}</p>
        <p><strong>Khách hàng:</strong> {{ $order->user->name ?? 'N/A' }}</p>
        <p><strong>Địa chỉ giao hàng:</strong> {{ $order->shipping_address ?? 'N/A' }}</p>
        <p><strong>Phương thức thanh toán:</strong> {{ ucfirst($order->payment_method ?? 'N/A') }}</p>
        <p><strong>Trạng thái:</strong>
            @php
            $statusLabels = [
            'pending' => 'Chờ xử lý',
            'processing' => 'Đang xử lý',
            'completed' => 'Hoàn thành',
            'cancelled' => 'Đã hủy',
            ];
            @endphp
            {{ $statusLabels[$order->status] ?? $order->status }}
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 5%; text-align: center">STT</th>
                <th style="width: 45%; text-align: center">Sản phẩm</th>
                <th style="width: 15%; text-align: center">Số lượng</th>
                <th style="width: 15%; text-align: center">Đơn giá (VNĐ)</th>
                <th style="width: 20%; text-align: center">Thành tiền</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $index => $item)
            <tr>
                <td style="text-align: center">{{ $index + 1 }}</td>
                <td>{{ $item->product->product ?? 'Sản phẩm' }}</td>
                <td style="text-align: center">{{ $item->quantity }}</td>
                <td style="text-align: center">{{ number_format($item->product->price ?? 0, 0, ',', '.') }}</td>
                <td style="text-align: center">{{ number_format(($item->quantity * ($item->product->price ?? 0)), 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" style="text-align: right;">Tổng cộng</td>
                <td>{{ number_format($order->total_amount, 0, ',', '.') }} VNĐ</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: right;">Bằng chữ</td>
                <td>{{$order->amount_in_words}}</td>
            </tr>
        </tfoot>
    </table>

    <table class="sign">
        <tr>
            <td>
                <strong>Khách hàng</strong><br>
                <p>(Ký và ghi rõ họ tên)</p>
            </td>
            <td>
                <strong>Nhân viên bán hàng</strong><br>
                <p>(Ký và ghi rõ họ tên)</p>
            </td>
        </tr>
    </table>

    <div class="footer">
        Cảm ơn quý khách đã mua hàng tại <strong>CaCanhTV</strong><br>
        Hóa đơn được tạo tự động vào {{ now('Asia/Ho_Chi_Minh')->format('H:i d/m/Y') }}.
    </div>

</body>

</html>