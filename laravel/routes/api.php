<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\NewsController;

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

// Lấy thông tin user
Route::get('/user', [AuthController::class, 'userMe'])->middleware('auth:api');
// Cập nhật user
Route::post('/user-update', [AuthController::class, 'update'])->middleware('auth:api');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

Route::prefix('ca-canh')->middleware(['auth:api', 'checkRole:admin'])->group(function () {
    Route::post('create-product', [ProductController::class, 'create']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductController::class, 'delete']);

    Route::post('create-category', [CategoryController::class, 'create']);
    Route::post('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'delete']);
    Route::get('detail-category/{id}', [CategoryController::class, 'getDetail']);

    Route::get('list-customer', [CustomerController::class, 'getAll']);
    Route::get('detail-customer/{id}', [CustomerController::class, 'getDetail']);
    Route::post('create-customer', [CustomerController::class, 'create']);
    Route::post('update-customer/{id}', [CustomerController::class, 'update']);

    Route::post('create-news', [NewsController::class, 'create']);
    Route::post('update-news/{id}', [NewsController::class, 'update']);
});
Route::prefix('ca-canh')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    //Product 
    Route::get('/products', [ProductController::class, 'getAll']);
    Route::get('/detail-product/{id}', [ProductController::class, 'getDetail']);
    Route::get('/category', [CategoryController::class, 'getAll']);

    Route::get('news', [NewsController::class, 'getAll']);
    Route::get('detail-news/{id}', [NewsController::class, 'getDetail']);
});
