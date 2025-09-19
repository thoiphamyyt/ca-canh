<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'content',
        'images',
        'status',
        'published_at',
        'link'
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
        'images' => 'array',
    ];
}
