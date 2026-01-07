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
        'social_facebook',
        'social_instagram',
        'social_twitter',
        'social_youtube',
    ];
}
