<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SiteSetting;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Show posts by category.
     */
    public function category($categorySlug): Response
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $news = News::published()
            ->where('category_id', $category->id)
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12);

        $publicData = $this->getPublicData();

        return Inertia::render('home/category', array_merge([
            'category' => $category,
            'news' => $news,
        ], $publicData))->withViewData([
                    'title' => 'Berita ' . $category->name,
                    'meta' => $category->description ?? 'Portal berita terpercaya menyajikan informasi tercepat, akurat, dan mendalam seputar ' . $category->name . '.',
                    'image' => $publicData['siteSettings']->logo ?? null,
                ]);
    }

    /**
     * Show post by category and optionally sub-category.
     */
    public function show($categorySlug, $subCategoryOrSlug, $postSlug = null): Response
    {
        // Handle /{category}/{post_slug}
        if ($postSlug === null) {
            $postSlug = $subCategoryOrSlug;
            $subCategorySlug = null;
        } else {
            // Handle /{category}/{subcategory}/{post_slug}
            $subCategorySlug = $subCategoryOrSlug;
        }

        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $query = News::with(['category', 'subCategory', 'user', 'tags'])
            ->where('category_id', $category->id)
            ->where('slug', $postSlug)
            ->published();

        if ($subCategorySlug) {
            $subCategory = SubCategory::where('slug', $subCategorySlug)
                ->where('category_id', $category->id)
                ->firstOrFail();
            $query->where('sub_category_id', $subCategory->id);
        }

        $post = $query->firstOrFail();

        // Increment views
        $post->increment('views');

        // Get related posts (same category, excluding current post)
        $relatedPosts = News::published()
            ->with(['category', 'subCategory', 'user'])
            ->where('category_id', $category->id)
            ->where('id', '!=', $post->id)
            ->recent()
            ->take(4)
            ->get();

        // Data for Sidebar (Trending & Latest)
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

        return Inertia::render('home/show', array_merge([
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'trendingNews' => $trendingNews,
            'latestNews' => $latestNews
        ], $this->getPublicData()))->withViewData([
                    'title' => $post->title,
                    'meta' => $post->excerpt ?? \Illuminate\Support\Str::limit(strip_tags($post->content), 160),
                    'image' => $post->thumbnail,
                    'author' => $post->user->name,
                    'published_at' => $post->published_at,
                    'category' => $post->category->name,
                    'tags' => $post->tags->pluck('name')->join(', '),
                ]);
    }

    public function tag($tagSlug): Response
    {
        $tag = \App\Models\Tag::where('slug', $tagSlug)->firstOrFail();

        $news = $tag->news()
            ->published()
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12);

        return Inertia::render('home/category', array_merge([
            'category' => [
                'name' => 'Tag: ' . $tag->name,
                'slug' => 'tag/' . $tag->slug,
                'description' => $tag->description ?? 'Kumpulan berita dengan tag ' . $tag->name
            ],
            'news' => $news,
        ], $this->getPublicData()))->withViewData([
                    'title' => 'Tag: ' . $tag->name,
                    'meta' => $tag->description ?? 'Berita terbaru dengan tag ' . $tag->name,
                ]);
    }

    public function search(Request $request): Response
    {
        $query = $request->input('q');

        $news = News::published()
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12);

        return Inertia::render('home/category', array_merge([
            'category' => [
                'name' => 'Pencarian: ' . $query,
                'slug' => 'search',
                'description' => "Hasil pencarian untuk '{$query}'"
            ],
            'news' => $news,
        ], $this->getPublicData()))->withViewData([
                    'title' => 'Pencarian: ' . $query,
                    'meta' => "Hasil pencarian berita untuk '{$query}'",
                ]);
    }
}
