<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Chuyển status sang enum
            $table->enum('status', ['draft', 'published', 'archived'])
                ->default('draft')
                ->change();
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Quay lại kiểu integer cũ nếu rollback
            $table->integer('status')->default(0)->change();
        });
    }
};
