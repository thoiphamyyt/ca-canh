<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string|max:2000',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Thông tin liên hệ đã được gửi thành công.',
            'data' => $contact
        ], 201);
    }

    public function index(Request $request)
    {
        $formData = $request->all();
        $query = Contact::query();
        if (!empty($formData['status'])) {
            $query->where('status', $formData['status']);
        }
        $contacts = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }
    public function detail($id)
    {
        $contacts = Contact::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Trạng thái liên hệ đã được cập nhật.',
        ]);
    }

    public function delete($id)
    {
        Contact::findOrFail($id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa liên hệ.',
        ]);
    }
}
