<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'order',
        'is_show',
    ];

    protected $casts = [
        'is_show' => 'boolean',
    ];

    /**
     * Get the category that owns the sub category.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the news for the sub category.
     */
    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }
}
