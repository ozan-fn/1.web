<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('dashboard/categories/index', [
            'categories' => Category::when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
                ->when($request->field && $request->direction, function ($query) use ($request) {
                    $query->orderBy($request->field, $request->direction);
                }, function ($query) {
                    $query->orderBy('order');
                })
                ->get(),
            'filters' => $request->only(['search', 'field', 'direction'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_nav' => 'required|boolean',
            'is_homepage' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        Category::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_nav' => 'required|boolean',
            'is_homepage' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->back();
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
}
