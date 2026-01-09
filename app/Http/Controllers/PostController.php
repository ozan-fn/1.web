<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Helper untuk mengambil data publik secara konsisten (Global Props).
     * Digunakan untuk Sidebar, Navbar, dan Footer.
     */
    protected function getPublicData(): array
    {
        return [
            'categories' => Category::where('is_nav', true)->orderBy('order')->get(),
            'siteSettings' => SiteSetting::first(),
            // JOS: Eager loading category agar slug tidak undefined di Sidebar
            'trendingNews' => News::published()
                ->with(['category', 'subCategory'])
                ->recent()
                ->orderBy('views', 'desc')
                ->take(5)
                ->get(),
            'latestNews' => News::published()
                ->with(['category', 'subCategory'])
                ->recent()
                ->take(3)
                ->get(),
        ];
    }

    /**
     * Menampilkan daftar berita berdasarkan kategori.
     */
    public function category($categorySlug): Response
    {
        $category = Category::where('slug', $categorySlug)->firstOrFail();

        $news = News::published()
            ->where('category_id', $category->id)
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12)
            ->withQueryString();

        $publicData = $this->getPublicData();

        return Inertia::render('home/category', array_merge([
            'category' => $category,
            'news' => $news,
        ], $publicData))->withViewData([
            'title' => 'Berita ' . $category->name,
            'meta' => $category->description ?? 'Portal berita terpercaya seputar ' . $category->name . '.',
            'image' => ($publicData['siteSettings'] && $publicData['siteSettings']->logo)
                ? asset('storage/' . $publicData['siteSettings']->logo)
                : asset('storage/settings/og-default.jpg'),
        ]);
    }

    /**
     * Menampilkan detail postingan berita.
     */
    public function show($categorySlug, $subCategoryOrSlug, $postSlug = null): Response
    {
        // Handling routing dinamis untuk subkategori
        if ($postSlug === null) {
            $postSlug = $subCategoryOrSlug;
            $subCategorySlug = null;
        } else {
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
        $post->increment('views');

        // FIX: Tambahkan with(['category', 'subCategory']) untuk mencegah error 'slug' undefined di frontend
        $relatedPosts = News::published()
            ->with(['category', 'subCategory'])
            ->where('category_id', $category->id)
            ->where('id', '!=', $post->id)
            ->recent()
            ->take(4)
            ->get();

        return Inertia::render('home/show', array_merge([
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ], $this->getPublicData()))->withViewData([
            'title' => $post->title,
            'meta' => $post->excerpt ?: Str::limit(strip_tags($post->content), 160),
            'image' => $post->thumbnail_url,
            'author' => $post->user->name,
            'published_at' => $post->published_at ? $post->published_at->toIso8601String() : null,
            'category' => $post->category->name,
            'tags' => $post->tags->pluck('name')->join(', '),
        ]);
    }

    /**
     * Menampilkan berita berdasarkan Tag.
     */
    public function tag($tagSlug): Response
    {
        $tag = Tag::where('slug', $tagSlug)->firstOrFail();

        $news = $tag->news()
            ->published()
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12);

        return Inertia::render('home/category', array_merge([
            'category' => [
                'name' => 'Tag: ' . $tag->name,
                'slug' => 'tag/' . $tag->slug,
                'description' => 'Kumpulan berita terbaru dengan topik ' . $tag->name
            ],
            'news' => $news,
        ], $this->getPublicData()))->withViewData([
            'title' => 'Topik: ' . $tag->name,
            'meta' => 'Baca berita terbaru mengenai ' . $tag->name,
        ]);
    }

    /**
     * Fitur Pencarian Berita.
     */
    public function search(Request $request): Response
    {
        $queryText = $request->input('q');

        $news = News::published()
            ->where(function ($q) use ($queryText) {
                $q->where('title', 'like', "%{$queryText}%")
                  ->orWhere('content', 'like', "%{$queryText}%")
                  ->orWhere('excerpt', 'like', "%{$queryText}%");
            })
            ->with(['category', 'subCategory', 'user'])
            ->recent()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('home/category', array_merge([
            'category' => [
                'name' => 'Hasil Pencarian: ' . $queryText,
                'slug' => 'search',
                'description' => "Menampilkan berita untuk '{$queryText}'"
            ],
            'news' => $news,
            'searchQuery' => $queryText
        ], $this->getPublicData()))->withViewData([
            'title' => 'Cari: ' . $queryText,
            'meta' => "Hasil pencarian untuk '{$queryText}'",
        ]);
    }
}
