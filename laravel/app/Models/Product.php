<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'key_product',
        'product',
        'price',
        'old_price',
        'quantity',
        'rating',
        'description',
        'image',
        'id_category',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    protected $casts = [
        'image' => 'array', // tự động cast JSON -> array khi query
    ];
}
