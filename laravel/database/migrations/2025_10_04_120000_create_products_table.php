<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('key_product')->nullable();
            $table->string('product'); // tên sản phẩm
            $table->decimal('price', 12, 2)->default(0);
            $table->decimal('old_price', 12, 2)->nullable();
            $table->integer('quantity')->default(0);
            $table->integer('review_count')->default(0);
            $table->float('rating', 2, 1)->default(0); // điểm đánh giá
            $table->text('description')->nullable();
            $table->json('images')->nullable(); // lưu array JSON
            $table->unsignedBigInteger('id_category')->nullable(); // nếu bạn dùng category
            $table->text('describe')->nullable(); // mô tả dài
            $table->text('slug')->nullable(); // mô tả dài
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
