<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\News;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
                'link' => 'nullable|url',
                'status' => 'nullable|string|in:draft,published',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $slug = Str::slug($formData['title']);
            $listImage = [];
            if ($request->hasFile('images')) {
                $listFiles = $request->file('images');
                foreach ($listFiles as $value) {
                    $listImage[] = $value->store('news', 'public');
                }
            }
            $news = News::create([
                'title' => $formData['title'],
                'slug' => $slug,
                'content' => $formData['content'],
                'images' => $listImage ?? null,
                'link' => $formData['link'] ?? null,
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
            $valid = Validator::make($formData, [
                'title' => 'nullable|string',
                'content' => 'nullable|string',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpg,jpeg,png|max:2048',
                'link' => 'nullable|url',
                'status' => 'nullable|string|in:draft,published',
            ]);
            if ($valid->fails()) {
                return response()->json(['errors' => $valid->errors(), 'success' => false], 422);
            }
            $news = News::find($id);
            if (!$news) {
                return response()->json(['message' => 'Không tìm thấy bài viết.', 'success' => false], 409);
            }
            if (isset($formData['title'])) {
                $news->title = $formData['title'];
                $news->slug = Str::slug($formData['title']);
            }
            if (isset($formData['content'])) {
                $news->content = $formData['content'];
            }

            if (isset($formData['link'])) {
                $news->link = $formData['link'];
            }
            if (isset($formData['status'])) {
                $news->status = $formData['status'];
            }
            $listImageData = $news->images ?? [];
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
                    $listImageData[] = $value->store('news', 'public');
                }
            }
            $news->images = $listImageData;
            $news->save();
            return response()->json(['data' => $news, 'success' => true], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi server.', 'success' => false], 500);
        }
    }
    public function delete($id)
    {
        try {
            $news = News::find($id);
            if (!$news) {
                return response()->json(['message' => 'Không tìm thấy bài viết.', 'success' => false], 409);
            }
            if ($news->images && is_array($news->images)) {
                foreach ($news->images as $img) {
                    if (Storage::disk('public')->exists($img)) {
                        Storage::disk('public')->delete($img);
                    }
                }
            }
            $news->delete();
            return response()->json(['message' => 'Xóa bài viết thành công', 'success' => true], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Lỗi hệ thống, vui lòng thử lại sau.', 'success' => false], 500);
        }
    }
}
