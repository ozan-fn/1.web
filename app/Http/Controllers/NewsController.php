<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\NewsImage; // 1. Tambah import
use App\Http\Requests\PostRequest; // 2. Tambah import
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard/posts/index', [
            'posts' => News::with(['category:id,name,slug', 'subCategory:id,name,slug', 'user:id,name'])
                ->when($request->search, function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                })
                ->when($request->filled(['field', 'direction']), function ($query) use ($request) {
                    $query->orderBy($request->field, $request->direction);
                }, function ($query) {
                    $query->orderBy('created_at', 'desc');
                })
                ->paginate(10) // 3. Sebaiknya gunakan paginate untuk dashboard
                ->withQueryString(),
            'filters' => $request->only(['search', 'field', 'direction'])
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/posts/form', [
            'post'           => null,
            'categories'     => Category::orderBy('order')->get(['id', 'name']),
            // Pastikan nama variabelnya 'sub_categories' (dengan underscore)
            'sub_categories' => SubCategory::orderBy('order')->get(['id', 'name', 'category_id']),
            'tags'           => Tag::orderBy('name')->get(['id', 'name']),
        ]);
    }



    public function store(PostRequest $request)
        {
            $validated = $request->validated();
            $validated['user_id'] = auth()->id();
            $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

            if (empty($validated['category_id']) && !empty($validated['category_name'])) {
                $category = Category::firstOrCreate(
                    ['name' => $validated['category_name']],
                    ['slug' => Str::slug($validated['category_name']), 'order' => 0, 'is_nav' => true, 'is_homepage' => false]
                );
                $validated['category_id'] = $category->id;
            }
            unset($validated['category_name']);

            // IMPROVED AUTO EXCERPT
            if (empty($validated['excerpt'])) {
                $validated['excerpt'] = $this->generateJosExcerpt($validated['content']);
            }

            if ($request->hasFile('thumbnail')) {
                $validated['thumbnail'] = $request->file('thumbnail')->store('news-thumbnails', 'public');
            }

            $post = News::create($validated);
            $this->syncTags($post, $request->tags);
            $this->processContentImages($post);

            return redirect()->route('dashboard.posts.index')->with('success', 'Post created successfully');
        }



    public function edit(News $post)
    {
        return Inertia::render('dashboard/posts/form', [
            'post'           => $post->load('tags'),
            'categories'     => Category::orderBy('order')->get(['id', 'name']),
            'sub_categories' => SubCategory::orderBy('order')->get(['id', 'name', 'category_id']),
            'tags'           => Tag::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(PostRequest $request, News $post)
        {
            $validated = $request->validated();
            $validated['slug'] = $validated['slug'] ?: Str::slug($validated['title']);

            if (empty($validated['category_id']) && !empty($validated['category_name'])) {
                $category = Category::firstOrCreate(
                    ['name' => $validated['category_name']],
                    ['slug' => Str::slug($validated['category_name']), 'order' => 0, 'is_nav' => true, 'is_homepage' => false]
                );
                $validated['category_id'] = $category->id;
            }
            unset($validated['category_name']);

            // IMPROVED AUTO EXCERPT
            if (empty($validated['excerpt'])) {
                $validated['excerpt'] = $this->generateJosExcerpt($validated['content']);
            }

            if ($request->hasFile('thumbnail')) {
                if ($post->thumbnail) Storage::disk('public')->delete($post->thumbnail);
                $validated['thumbnail'] = $request->file('thumbnail')->store('news-thumbnails', 'public');
            }

            $post->update($validated);
            $this->syncTags($post, $request->tags);
            $this->processContentImages($post);

            return redirect()->back()->with('success', 'Post updated successfully');
        }

    private function processContentImages(News $post)
    {
        $imagesInContent = News::extractImagesFromHtml($post->content);
        $currentPaths = [];

        foreach ($imagesInContent as $url) {
            if (str_contains($url, 'news-content/')) {
                $path = 'news-content/' . basename(parse_url($url, PHP_URL_PATH));
                $currentPaths[] = $path;

                NewsImage::where('path', $path)->update([
                    'news_id' => $post->id,
                    'status'  => 'active'
                ]);
            }
        }

        // Cleanup: Hapus gambar yang ada di DB/Storage tapi sudah dihapus dari Editor
        $orphanedImages = NewsImage::where('news_id', $post->id)
            ->whereNotIn('path', $currentPaths)
            ->get();

        foreach ($orphanedImages as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }
    }

    public function uploadEditorImage(Request $request)
    {
        $request->validate(['image' => 'required|image|max:10240']);
        $path = $request->file('image')->store('news-content', 'public');

        NewsImage::create([
            'path'    => $path,
            'status'  => 'inactive',
            'news_id' => null
        ]);

        return response()->json(['url' => asset('storage/' . $path)]);
    }

    public function destroy(News $post)
    {
        if ($post->thumbnail) Storage::disk('public')->delete($post->thumbnail);

        $images = NewsImage::where('news_id', $post->id)->get();
        foreach ($images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        $post->delete();
        return redirect()->back()->with('success', 'Post deleted successfully');
    }

    private function syncTags($post, $tags)
    {
        if (is_null($tags)) {
            $post->tags()->detach();
            return;
        }

        $tagIds = collect($tags)->map(fn($name) =>
            Tag::firstOrCreate(['name' => $name], ['slug' => Str::slug($name)])->id
        );
        $post->tags()->sync($tagIds);
    }

    /**
         * Helper untuk generate excerpt yang bersih dan rapi
         */
        private function generateJosExcerpt($content)
        {
            // 1. Ganti tag blok (p, div, h1-h6, br, summary) menjadi spasi agar kata tidak menempel
            $text = preg_replace('/<(p|br|div|h[1-6]|li|summary|details)[^>]*>/i', ' ', $content);

            // 2. Bersihkan semua tag HTML sisanya
            $text = strip_tags($text);

            // 3. Decode entitas HTML (seperti &hellip; atau &nbsp; menjadi karakter aslinya)
            $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');

            // 4. Hapus whitespace berlebih (double space, tab, newline) menjadi satu spasi
            $text = preg_replace('/\s+/', ' ', $text);

            // 5. Potong 160 karakter dengan rapi
            return Str::limit(trim($text), 160);
        }
}
