<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'sub_category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'status',
        'views',
        'is_featured',
        'published_at',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    /**
     * Get the user that authored the news.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category that the news belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the sub category that the news belongs to.
     */
    public function subCategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class);
    }

    /**
     * The tags that belong to the news.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * Get the comments for the news.
     */
    public function comments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Static helper to extract images from HTML content.
     */
    public static function extractImagesFromHtml($html): array
    {
        if (empty($html))
            return [];
        preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);
        return $matches[1] ?? [];
    }

    /**
     * Boot the model to handle automatic cleanup on deletion.
     */
    protected static function booted()
    {
        static::deleting(function ($post) {
            // Delete thumbnail
            if ($post->thumbnail) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($post->thumbnail);
            }

            // Delete all images referenced in content
            foreach (self::extractImagesFromHtml($post->content) as $url) {
                $path = str_replace('/storage/', '', parse_url($url, PHP_URL_PATH));
                \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            }
        });
    }
}
