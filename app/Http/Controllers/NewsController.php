<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SubCategory;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard/posts/index', [
            'posts' => News::with(['category', 'subCategory', 'user'])
                ->when($request->search, function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                })
                ->when($request->field && $request->direction, function ($query) use ($request) {
                    $query->orderBy($request->field, $request->direction);
                }, function ($query) {
                    $query->orderBy('created_at', 'desc');
                })
                ->get(),
            'filters' => $request->only(['search', 'field', 'direction'])
        ]);
    }

    public function create()
    {
        $post = News::create([
            'user_id' => auth()->id(),
            'title' => '',
            'content' => '',
            'status' => 'draft',
        ]);

        return redirect()->route('dashboard.posts.edit', $post->id);
    }

    public function edit(News $post)
    {
        return Inertia::render('dashboard/posts/form', [
            'post' => $post->load('tags'),
            'categories' => Category::orderBy('order')->get(),
            'subCategories' => SubCategory::orderBy('order')->get(),
            'tags' => Tag::orderBy('name')->get(),
        ]);
    }

    public function store(\App\Http\Requests\PostRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $validated['thumbnail'] = $file->storeAs('news-thumbnails', $filename, 'public');
        }

        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $news = News::create($validated);
        if ($request->tags)
            $news->tags()->sync($request->tags);

        return redirect()->route('dashboard.posts.index')->with('success', 'Post created successfully');
    }

    public function update(\App\Http\Requests\PostRequest $request, News $post)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title']);

        // Handle Thumbnail
        if ($request->hasFile('thumbnail')) {
            if ($post->thumbnail)
                Storage::disk('public')->delete($post->thumbnail);
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $validated['thumbnail'] = $file->storeAs('news-thumbnails', $filename, 'public');
        } else {
            $validated['thumbnail'] = $post->thumbnail;
        }

        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        // Sync missing images from news_images table
        $currentImagesInContent = News::extractImagesFromHtml($validated['content']);
        foreach ($post->contentImages as $image) {
            $imageUrl = '/storage/' . $image->path;
            if (!in_array($imageUrl, $currentImagesInContent)) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        $post->update($validated);
        $post->tags()->sync($request->tags ?? []);

        return redirect()->route('dashboard.posts.index')->with('success', 'Post updated successfully');
    }

    public function destroy(News $post)
    {
        $post->delete(); // Otomatis trigger file cleanup di Model
        return redirect()->back()->with('success', 'Post deleted successfully');
    }

    public function uploadEditorImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
            'news_id' => 'required|exists:news,id'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('news-content', $filename, 'public');

            \App\Models\NewsImage::create([
                'news_id' => $request->news_id,
                'path' => $path
            ]);

            return response()->json([
                'url' => '/storage/' . $path
            ]);
        }
        return response()->json(['error' => 'Upload failed'], 400);
    }

    public function deleteEditorImage(Request $request)
    {
        $request->validate(['url' => 'required|string']);
        $path = str_replace('/storage/', '', parse_url($request->url, PHP_URL_PATH));

        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            \App\Models\NewsImage::where('path', $path)->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['error' => 'Image not found'], 404);
    }

    private function extractImages($html)
    {
        if (empty($html))
            return [];

        preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);
        return $matches[1] ?? [];
    }
}
