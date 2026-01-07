<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;

abstract class Controller
{
    protected function getPublicData()
    {
        return [
            'siteSettings' => Cache::remember('site_settings', 3600, fn() => SiteSetting::first()),
            'categories' => Cache::remember('nav_categories', 3600, fn() => Category::where('is_nav', true)->orderBy('order')->get()),
        ];
    }
}
