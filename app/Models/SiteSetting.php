<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'tagline',
        'description',
        'email',
        'phone',
        'address',
        'logo',
        'favicon',
        // Tambahkan kolom warna baru di sini:
        'color_primary',
        'color_primary_foreground',
        'color_background',
        'color_foreground',
        'color_card',
        'color_border',
        'color_radius',
        // Sosial Media
        'social_facebook',
        'social_instagram',
        'social_twitter',
        'social_youtube',
    ];

    /**
     * Opsional: Accessor untuk memastikan radius selalu memiliki unit (rem/px)
     * Jika user lupa memasukkan unitnya.
     */
    protected function colorRadius(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            set: fn($value) => is_numeric($value) ? $value . 'rem' : $value,
        );
    }
}