<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $heroNews = News::with(['category', 'user'])
            ->where('status', 'published')
            ->where('is_featured', true)
            ->latest('published_at')
            ->first();

        // If no featured news, just get the latest one
        if (!$heroNews) {
            $heroNews = News::with(['category', 'user'])
                ->where('status', 'published')
                ->latest('published_at')
                ->first();
        }

        $sideHeroNews = News::with(['category', 'user'])
            ->where('status', 'published')
            ->where('id', '!=', $heroNews?->id)
            ->latest('published_at')
            ->take(2)
            ->get();

        $nationalNews = News::with(['category', 'user'])
            ->where('status', 'published')
            ->whereNotIn('id', array_filter([$heroNews?->id, ...$sideHeroNews->pluck('id')->toArray()]))
            ->latest('published_at')
            ->take(4)
            ->get();

        $trendingNews = News::with(['category'])
            ->where('status', 'published')
            ->orderBy('views', 'desc')
            ->take(5)
            ->get();

        $latestNews = News::with(['category'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take(3)
            ->get();

        $categories = Category::all();

        $videoNews = News::with(['category'])
            ->where('status', 'published')
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('home/index', [
            'heroNews' => $heroNews,
            'sideHeroNews' => $sideHeroNews,
            'nationalNews' => $nationalNews,
            'trendingNews' => $trendingNews,
            'latestNews' => $latestNews,
            'videoNews' => $videoNews,
            'categories' => $categories,
        ]);
    }
}
