<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    public function statisticalCustomer()
    {
        $currentYear = date('Y');
        $currentMonth = date('m');
        $customerMonth = 0;
        $orderMonth = 0;
        $customerStats = DB::table('users')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('created_at', $currentYear)->where('role', 'user')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        $orderStats = DB::table('orders')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('created_at', $currentYear)
            ->where('status', 'completed')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $statsArray = array_fill(1, 12, 0);
        foreach ($customerStats as $stat) {
            $statsArray[$stat->month] = $stat->count;
            if ($stat->month == $currentMonth) {
                $customerMonth = $stat->count;
            }
        }

        $statsArrayOrder = array_fill(1, 12, 0);
        foreach ($orderStats as $stat) {
            $statsArrayOrder[$stat->month] = $stat->count;
            if ($stat->month == $currentMonth) {
                $orderMonth = $stat->count;
            }
        }

        return response()->json([
            'year' => $currentYear,
            'statistics' => $statsArray,
            'statisticsOrder' => $statsArrayOrder,
            'totalCustomers' => array_sum($statsArray),
            'totalOrders' => array_sum($statsArrayOrder),
            'customerMonth' => $customerMonth,
            'orderMonth' => $orderMonth,
            'success' => true
        ]);
    }
    public function monthlyTarget()
    {
        try {
            // ✅ Giả định mục tiêu doanh thu tháng (có thể lấy từ bảng khác sau này)
            $monthlyTarget = 10_000_000; // 10 triệu

            // Lấy thời gian hiện tại
            $now = Carbon::now();
            $startOfMonth = $now->copy()->startOfMonth();
            $endOfMonth = $now->copy()->endOfMonth();
            $today = $now->copy()->startOfDay();

            // ✅ Doanh thu trong tháng
            $currentRevenue = Order::whereBetween('order_date', [$startOfMonth, $endOfMonth])
                ->where('status', 'completed')
                ->sum('total_amount');

            // ✅ Doanh thu hôm nay
            $todayRevenue = Order::whereDate('order_date', $today)
                ->where('status', 'completed')
                ->sum('total_amount');

            // ✅ Doanh thu tháng trước
            $lastMonthStart = $now->copy()->subMonth()->startOfMonth();
            $lastMonthEnd = $now->copy()->subMonth()->endOfMonth();
            $lastMonthRevenue = Order::whereBetween('order_date', [$lastMonthStart, $lastMonthEnd])
                ->where('status', 'completed')
                ->sum('total_amount');

            // ✅ Tính tiến độ & tăng trưởng
            $progress = $monthlyTarget > 0 ? round(($currentRevenue / $monthlyTarget) * 100, 2) : 0;
            $growthRate = $lastMonthRevenue > 0
                ? round((($currentRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 2)
                : 0;

            return response()->json([
                'target' => $monthlyTarget,
                'current_revenue' => $currentRevenue,
                'today_revenue' => $todayRevenue,
                'progress' => $progress,
                'growth_rate' => $growthRate,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'content' => 'Không lấy được dữ liệu, vui lòng thử lại sau.'
            ], 500);
        }
    }

    public function statistics()
    {
        $totalOrders = Order::count();

        $totalRevenue = Order::where('status', 'completed')->sum('total_amount');

        $ordersByStatus = Order::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $revenueByMonth = Order::select(
            DB::raw('MONTH(order_date) as month'),
            DB::raw('SUM(total_amount) as total')
        )
            ->whereYear('order_date', now()->year)
            ->where('status', 'completed')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $recentOrders = Order::with('user')
            ->latest()
            ->take(10)
            ->get();

        return view('admin.orders.statistics', compact(
            'totalOrders',
            'totalRevenue',
            'ordersByStatus',
            'revenueByMonth',
            'recentOrders'
        ));
    }
}
