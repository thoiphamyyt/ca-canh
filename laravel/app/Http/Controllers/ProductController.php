<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function getAll(Request $request)
    {
        $formData = $request->all();
        $query = Product::join('categories as c', 'products.id_category', '=', 'c.id')
            ->select('products.*', 'c.name as category_name');
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
    public function create(Request $request)
    {
        try {
            $formData = $request->all();
            $valid = Validator::make($formData, [
                'key_product' => 'required|string',
                'product' => 'required|string',
                'quantity' => 'required|string',
                'price' => 'required|string',
                'description' => 'nullable|string',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $getProduct = Product::where('key_product', $formData['key_product'])->first();
            if ($getProduct) {
                return response()->json(['message' => 'Mã sản phẩm đã tồn tại.', 'success' => false], 409);
            }
            $listImage = [];
            if ($request->hasFile('images')) {
                $listFiles = $request->file('images');
                foreach ($listFiles as $value) {
                    $listImage[] = $value->store('product', 'public');
                }
            }

            $product = Product::create([
                'key_product' => $formData['key_product'],
                'id_category' => $formData['id_category'],
                'product' => $formData['product'],
                'rating' => 0,
                'quantity' => @$formData['quantity'],
                'price' => $formData['price'] ?? null,
                'old_price' => $formData['old_price'] !== "undefined" ? $formData['old_price'] : 0,
                'description' => $formData['description'] ?? null,
                'images' => $listImage ?? null,
            ]);

            return response()->json(['message' => 'Thêm sản phẩm thành công', 'product' => $product, 'success' => true], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $formData = $request->all();
            $valid = Validator::make($formData, [
                'key_product' => 'required|string',
                'product' => 'required|string',
                'quantity' => 'required|string',
                'price' => 'required|string',
                'description' => 'nullable|string',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors()], 422);
            }
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Không tìm thấy sản phẩm.', 'success' => false], 409);
            }
            $listImageData = $product->images ?? [];
            if (isset($formData['images_removed']) && is_array($formData['images_removed'])) {
                foreach ($formData['images_removed'] as $img) {
                    if ($listImageData && in_array($img, $listImageData)) {
                        $updatedImages = array_filter($listImageData, function ($image) use ($img) {
                            return $image !== $img;
                        });
                        $listImageData = array_values($updatedImages);
                        if (Storage::disk('public')->exists($img)) {
                            Storage::disk('public')->delete($img);
                        }
                    }
                }
            }
            if ($request->hasFile('images')) {
                $listFiles = $request->file('images');
                foreach ($listFiles as $value) {
                    $listImageData[] = $value->store('product', 'public');
                }
            }
            $product->images = $listImageData;
            if (isset($formData['product'])) {
                $product->product = $formData['product'];
            }
            if (isset($formData['id_category'])) {
                $product->id_category = $formData['id_category'];
            }
            if (isset($formData['quantity'])) {
                $product->quantity = $formData['quantity'];
            }
            if (isset($formData['price'])) {
                $product->price = $formData['price'];
            }
            if (isset($formData['old_price'])) {
                $product->old_price = $formData['old_price'];
            }
            if (isset($formData['description'])) {
                $product->description = $formData['description'];
            }
            $product->save();

            return response()->json(['message' => 'Cập nhật sản phẩm thành công', 'product' => $product, 'success' => true], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        }
    }

    public function delete($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Không tìm thấy sản phẩm.', 'success' => false], 409);
            }
            if ($product->images && is_array($product->images)) {
                foreach ($product->images as $img) {
                    if (Storage::disk('public')->exists($img)) {
                        Storage::disk('public')->delete($img);
                    }
                }
            }
            $product->delete();
            return response()->json(['message' => 'Xóa sản phẩm thành công', 'success' => true], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        }
    }
}
