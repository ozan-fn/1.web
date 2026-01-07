<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $siteSettings = SiteSetting::first();

        // Get hero and side hero news in one query
        $heroNewsItems = News::published()
            ->with(['category', 'user'])
            ->orderBy('is_featured', 'desc')
            ->recent()
            ->take(3)
            ->get();

        $heroNews = $heroNewsItems->shift();
        $sideHeroNews = $heroNewsItems;

        $trendingNews = News::published()
            ->with(['category'])
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        $latestNews = News::published()
            ->with(['category'])
            ->recent()
            ->take(3)
            ->get();

        $categories = Category::where('is_nav', true)
            ->orderBy('order')
            ->get();

        $homepageCategories = Category::where('is_homepage', true)
            ->with([
                'news' => function ($query) {
                    $query->published()
                        ->recent()
                        ->take(4);
                }
            ])
            ->orderBy('order')
            ->get();

        $videoNews = News::published()
            ->with(['category'])
            ->recent()
            ->take(5)
            ->get();

        return Inertia::render('home/index', [
            'heroNews' => $heroNews,
            'sideHeroNews' => $sideHeroNews,
            'trendingNews' => $trendingNews,
            'latestNews' => $latestNews,
            'videoNews' => $videoNews,
            'categories' => $categories,
            'homepageCategories' => $homepageCategories,
            'siteSettings' => $siteSettings,
        ]);
    }
}
