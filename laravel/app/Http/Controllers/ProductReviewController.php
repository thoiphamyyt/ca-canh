<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductReviewController extends Controller
{
    public function getAll(Request $request, $id)
    {
        $producReview = ProductReview::with(['user:id,name,avatar'])->where('product_id', $id)
            ->get();
        if ($producReview) {
            return response()->json([
                'success' => true,
                'data' => $producReview,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'content' => 'no data',
            ]);
        }
    }

    public function store(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $validated = $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'content' => 'required|string|max:1000',
                'images' => 'array',
            ]);

            $user = auth('api')->user();

            $review = ProductReview::create([
                'product_id' => $id,
                'user_id' => $user->id,
                'rating' => $validated['rating'],
                'content' => $validated['content'],
                'images' => $validated['images'] ?? [],
                'status' => 'pending',
            ]);

            $avgRating = ProductReview::where('product_id', $id)->avg('rating');
            $count = ProductReview::where('product_id', $id)->count();
            Product::where('id', $id)->update([
                'rating' => round($avgRating, 2),
                'review_count' => $count,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'review' => $review,
                'average_rating' => round($avgRating, 2),
                'review_count' => $count,
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'content' => 'Không thể đánh giá sản phẩm.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
