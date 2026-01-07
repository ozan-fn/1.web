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
     * Scope a query to only include published news.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to only include featured news.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to order by published date.
     */
    public function scopeRecent($query)
    {
        return $query->latest('published_at');
    }

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
     * Get the content images for the news.
     */
    public function contentImages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(NewsImage::class);
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

            // Delete all images from related news_images table and storage
            foreach ($post->contentImages as $image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        });
    }
}
