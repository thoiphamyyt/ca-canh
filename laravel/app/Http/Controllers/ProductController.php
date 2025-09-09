<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getAll(Request $request)
    {
        $formData = $request->all();
        $query = Product::query();

        if (!empty($formData['product'])) {
            $query->where('product', 'like', "%{$formData['product']}%");
        }
        if (!empty($formData['id_category'])) {
            $query->where('id_category', $formData['id_category']);
        }
        $product = $query->get();
        if (empty($product)) {
            return response()->json(['success' => false, 'message' => 'no data']);
        } else {
            return response()->json(['success' => true, 'data' => $product]);
        }
    }
    public function getDetail($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json(['success' => true, 'data' => $product]);
        } else {
            return response()->json(['success' => false, 'message' => 'no data']);
        }
    }

    public function getCategory()
    {
        $product = Category::orderBy('name', 'asc')->get();
        if (empty($product)) {
            return response()->json(['success' => false, 'message' => 'no data']);
        } else {
            return response()->json(['success' => true, 'data' => $product]);
        }
    }
}
