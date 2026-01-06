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
use Illuminate\Support\Facades\Artisan;

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
        return Inertia::render('dashboard/posts/form', [
            'categories' => Category::orderBy('order')->get(),
            'subCategories' => SubCategory::orderBy('order')->get(),
            'tags' => Tag::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'required|boolean',
            'thumbnail' => 'nullable|image|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

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

        if ($request->tags) {
            $news->tags()->sync($request->tags);
        }

        // Trigger cleanup to remove orphaned images uploaded during creation but not used
        Artisan::call('images:cleanup');

        return redirect()->route('dashboard.posts.index')->with('success', 'Post created successfully');
    }

    public function edit(News $post)
    {
        return Inertia::render('dashboard/posts/form', [
            'post' => $post->load('tags'),
            'categories' => Category::orderBy('order')->get(),
            'subCategories' => SubCategory::where('category_id', $post->category_id)->orderBy('order')->get(),
            'tags' => Tag::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, News $post)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'required|boolean',
            'thumbnail' => 'nullable|image|max:2048',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('thumbnail')) {
            if ($post->thumbnail) {
                Storage::disk('public')->delete($post->thumbnail);
            }
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $validated['thumbnail'] = $file->storeAs('news-thumbnails', $filename, 'public');
        }

        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        // Efficient Logic: Compare old and new content for removed images
        $oldImages = $this->extractImages($post->content);
        $newImages = $this->extractImages($validated['content']);

        $removedImages = array_diff($oldImages, $newImages);
        foreach ($removedImages as $imageUrl) {
            $path = str_replace(asset('storage/'), '', $imageUrl);
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $post->update($validated);

        if ($request->tags) {
            $post->tags()->sync($request->tags);
        } else {
            $post->tags()->detach();
        }

        return redirect()->route('dashboard.posts.index')->with('success', 'Post updated successfully');
    }

    public function destroy(News $post)
    {
        if ($post->thumbnail) {
            Storage::disk('public')->delete($post->thumbnail);
        }

        // Delete images from content
        $images = $this->extractImages($post->content);
        foreach ($images as $imageUrl) {
            $path = str_replace(asset('storage/'), '', $imageUrl);
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $post->delete();

        return redirect()->back()->with('success', 'Post deleted successfully');
    }

    public function uploadEditorImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('news-content', $filename, 'public');

            return response()->json([
                'url' => asset('storage/' . $path)
            ]);
        }

        return response()->json(['error' => 'Upload failed'], 400);
    }

    private function extractImages($html)
    {
        if (empty($html))
            return [];

        preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);
        return $matches[1] ?? [];
    }
}
