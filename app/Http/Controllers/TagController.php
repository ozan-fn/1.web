<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $tags = Tag::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->filled(['field', 'direction']), function ($query) use ($request) {
                $direction = strtolower($request->direction) === 'desc' ? 'desc' : 'asc';
                $query->orderBy($request->field, $direction);
            }, function ($query) {
                $query->orderBy('created_at', 'desc');
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/tags/index', [
            'tags'    => $tags,
            'filters' => $request->only(['search', 'field', 'direction'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Tag::create($validated);

        return redirect()->back()->with('success', 'Tag created successfully');
    }

    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $tag->update($validated);

        return redirect()->back()->with('success', 'Tag updated successfully');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->back()->with('success', 'Tag deleted successfully');
    }
}
