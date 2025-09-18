<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use Exception;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    public function getAll(Request $request)
    {
        $getNews = News::all();
        if ($getNews->isEmpty()) {
            return response()->json(['success' => false, 'message' => 'no data']);
        } else {
            return response()->json(['success' => true, 'data' => $getNews]);
        }
    }
    public function getDetail($id)
    {
        $news = News::find($id);
        if ($news) {
            return response()->json(['success' => true, 'data' => $news]);
        } else {
            return response()->json(['success' => false, 'message' => 'no data']);
        }
    }

    public function create(Request $request)
    {
        try {
            $formData = $request->all();
            $valid = Validator::make($formData, [
                'title' => 'required|string',
                'content' => 'required|string',
                'image' => 'nullable|string',
                'status' => 'nullable|string|in:draft,published',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $news = News::create([
                'title' => $formData['title'],
                'slug' => $formData['slug'],
                'content' => $formData['content'],
                'image' => $formData['image'] ?? null,
                'status' => $formData['status'] ?? 'draft',
            ]);
            return response()->json(['message' => 'Thêm bản tin thành công.', 'data' => $news, 'success' => true], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi server.', 'success' => false], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $formData = $request->all();
            $news = News::find($id);
            if (!$news) {
                return response()->json(['message' => 'Không tìm thấy bài viết.', 'success' => false], 409);
            }
            if (isset($formData['title'])) {
                $news->title = $formData['title'];
            }
            if (isset($formData['slug'])) {
                $news->slug = $formData['slug'];
            }
            if (isset($formData['content'])) {
                $news->content = $formData['content'];
            }
            if (isset($formData['image'])) {
                $news->image = $formData['image'];
            }
            if (isset($formData['status'])) {
                $news->status = $formData['status'];
            }
            $news->save();
            return response()->json(['data' => $news, 'success' => true], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi server.', 'success' => false], 500);
        }
    }
}
