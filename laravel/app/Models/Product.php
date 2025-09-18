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
        'images',
        'id_category',
    ];


    protected $appends = ['images_url'];

    public function getImagesUrlAttribute()
    {
        if (!$this->images) {
            return [];
        }

        return array_map(function ($images) {
            return asset('storage/' . $images);
        }, $this->images);
    }

    protected $casts = [
        'images' => 'array', // tự động cast JSON -> array khi query
    ];
}
