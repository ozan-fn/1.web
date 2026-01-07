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
        $publicData = $this->getPublicData();

        // Get hero and side hero news in one query
        $heroNewsItems = News::published()
            ->with(['category', 'subCategory', 'user'])
            ->orderBy('is_featured', 'desc')
            ->recent()
            ->take(3)
            ->get();

        $heroNews = $heroNewsItems->shift();
        $sideHeroNews = $heroNewsItems;

        $trendingNews = News::published()
            ->with(['category', 'subCategory'])
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        $latestNews = News::published()
            ->with(['category', 'subCategory'])
            ->recent()
            ->take(3)
            ->get();

        $homepageCategories = Category::where('is_homepage', true)
            ->with([
                'news' => function ($query) {
                    $query->published()
                        ->with(['category', 'subCategory', 'user'])
                        ->recent()
                        ->take(4);
                }
            ])
            ->orderBy('order')
            ->get();

        $videoNews = News::published()
            ->with(['category', 'subCategory'])
            ->recent()
            ->take(5)
            ->get();

        return Inertia::render('home/index', array_merge([
            'heroNews' => $heroNews,
            'sideHeroNews' => $sideHeroNews,
            'trendingNews' => $trendingNews,
            'latestNews' => $latestNews,
            'videoNews' => $videoNews,
            'homepageCategories' => $homepageCategories,
        ], $publicData));
    }
}
