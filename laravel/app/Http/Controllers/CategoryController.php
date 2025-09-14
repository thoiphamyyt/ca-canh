<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function getAll()
    {
        $category = Category::orderBy('name', 'asc')->get();
        if (empty($category)) {
            return response()->json(['success' => false, 'message' => 'no data']);
        } else {
            return response()->json(['success' => true, 'data' => $category]);
        }
    }

    public function getDetail($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json(['success' => true, 'data' => $category]);
        } else {
            return response()->json(['success' => false, 'message' => 'no data']);
        }
    }
    public function save($formData, $idUpdate = null)
    {
        // try {
        $valid = Validator::make($formData, [
            'name' => 'required|string',
        ]);
        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()], 422);
        }
        if ($idUpdate) {
            $category = Category::find($idUpdate);
            if (!$category) {
                return response()->json(['message' => 'Không tìm thấy loại sản phẩm.', 'success' => false], 409);
            }
            if (isset($formData['name'])) {
                $category->name = $formData['name'];
            }
            if (isset($formData['description'])) {
                $category->description = $formData['description'];
            }

            $category->save();
            return response()->json(['message' => 'Cập nhật loại sản phẩm thành công', 'category' => $category, 'success' => true], 201);
        } else {
            $category = Category::create([
                'name' => $formData['name'],
                'description' => $formData['description'] ?? null,
            ]);
            return response()->json(['message' => 'Thêm loại sản phẩm thành công', 'category' => $category, 'success' => true], 201);
        }
        // } catch (Exception $e) {
        //     return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        // }
    }
    public function create(Request $request)
    {
        return $this->save($request->all());
    }
    public function update(Request $request, $id)
    {
        return $this->save($request->all(), $id);
    }

    public function delete($id)
    {
        try {
            $category = Category::find($id);
            if (!$category) {
                return response()->json(['message' => 'Không tìm thấy loại sản phẩm.', 'success' => false], 409);
            }
            $category->delete();
            return response()->json(['message' => 'Xóa loại sản phẩm thành công', 'success' => true], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        }
    }
}
