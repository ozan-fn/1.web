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

        $tagIds = [];
        if ($request->tags) {
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                );
                $tagIds[] = $tag->id;
            }
        }
        $news->tags()->sync($tagIds);

        $this->syncContentImages($news);

        return redirect()->route('dashboard.posts.edit', $news->id)->with('success', 'Post created successfully');
    }

    private function syncContentImages(News $post)
    {
        $currentImagesInContent = News::extractImagesFromHtml($post->content);
        $storagePathsInContent = [];

        foreach ($currentImagesInContent as $url) {
            if (str_contains($url, 'news-content/')) {
                $filename = Str::after($url, 'news-content/');
                $filename = parse_url($filename, PHP_URL_PATH);
                $path = 'news-content/' . $filename;
                $storagePathsInContent[] = $path;

                // Create or update record to ensure news_id is set
                \App\Models\NewsImage::updateOrCreate(
                    ['path' => $path],
                    ['news_id' => $post->id]
                );
            }
        }

        // Only cleanup if images were correctly identified in content OR if content is truly empty of any images
        // To be safe, we only delete if the post actually has some images registered.
        if ($post->contentImages()->count() > 0) {
            foreach ($post->contentImages as $image) {
                if (!in_array($image->path, $storagePathsInContent)) {
                    $cleanPath = str_replace(['../', './'], '', $image->path);
                    if (\Illuminate\Support\Facades\Storage::disk('public')->exists($cleanPath)) {
                        \Illuminate\Support\Facades\Storage::disk('public')->delete($cleanPath);
                    }
                    $image->delete();
                }
            }
        }
    }

    public function update(\App\Http\Requests\PostRequest $request, News $post)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title']);

        // Handle Thumbnail
        if ($request->hasFile('thumbnail')) {
            if ($post->thumbnail)
                \Illuminate\Support\Facades\Storage::disk('public')->delete($post->thumbnail);
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $validated['thumbnail'] = $file->storeAs('news-thumbnails', $filename, 'public');
        } else {
            $validated['thumbnail'] = $post->thumbnail;
        }

        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        $tagIds = [];
        if ($request->tags) {
            foreach ($request->tags as $tagName) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tagName],
                    ['slug' => Str::slug($tagName)]
                );
                $tagIds[] = $tag->id;
            }
        }
        $post->tags()->sync($tagIds);

        $this->syncContentImages($post);

        return redirect()->back()->with('success', 'Post updated successfully');
    }

    public function destroy(News $post)
    {
        $post->delete(); // Otomatis trigger file cleanup di Model
        return redirect()->back()->with('success', 'Post deleted successfully');
    }

    public function uploadEditorImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
            'news_id' => 'nullable|exists:news,id'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('news-content', $filename, 'public');

            if ($request->news_id) {
                \App\Models\NewsImage::create([
                    'news_id' => $request->news_id,
                    'path' => $path
                ]);
            }

            return response()->json([
                'url' => '/storage/' . $path
            ]);
        }
        return response()->json(['error' => 'Upload failed'], 400);
    }

    public function deleteEditorImage(Request $request)
    {
        $request->validate(['url' => 'required|string']);

        $url = $request->url;
        if (!str_contains($url, 'news-content/')) {
            return response()->json(['error' => 'Invalid image path'], 400);
        }

        $filename = \Illuminate\Support\Str::after($url, 'news-content/');
        $filename = parse_url($filename, PHP_URL_PATH);
        $path = 'news-content/' . $filename;

        // Final safety check for path traversal
        $path = str_replace(['../', './'], '', $path);

        if (\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($path);
            \App\Models\NewsImage::where('path', $path)->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['error' => 'Image not found'], 404);
    }
}
