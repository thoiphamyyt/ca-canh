<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Lấy thông tin user
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'user'    => $request->user()
        ]);
    });

    // Cập nhật user
    Route::post('/user-update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::prefix('ca-canh')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    //Product 
    Route::get('/products', [ProductController::class, 'getAll']);
    Route::get('/detail-product/{id}', [ProductController::class, 'getDetail']);
    Route::get('/category', [ProductController::class, 'getCategory']);
});
