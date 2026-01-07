<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
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
            ->where('status', 'published');

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
        $relatedPosts = News::where('category_id', $category->id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('home/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts
        ])->withViewData([
                    'title' => $post->title,
                    'meta' => $post->excerpt ?? \Illuminate\Support\Str::limit(strip_tags($post->content), 160),
                    'image' => $post->thumbnail,
                    'author' => $post->user->name,
                    'published_at' => $post->published_at,
                    'category' => $post->category->name,
                    'tags' => $post->tags->pluck('name')->join(', '),
                ]);
    }
}
