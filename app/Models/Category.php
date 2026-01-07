<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'order',
        'is_nav',
        'is_homepage',
    ];

    protected $casts = [
        'is_nav' => 'boolean',
        'is_homepage' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the sub categories for the category.
     */
    public function subCategories(): HasMany
    {
        return $this->hasMany(SubCategory::class);
    }

    /**
     * Get the news for the category.
     */
    public function news(): HasMany
    {
        return $this->hasMany(News::class);
    }
}
