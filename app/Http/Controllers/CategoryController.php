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
        $categories = Category::query()
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
                $query->orderBy('order');
            })
            // Ganti 10 dengan jumlah data per halaman yang diinginkan
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/categories/index', [
            // Kirim data paginasi secara utuh agar frontend bisa akses links & meta
            'categories' => $categories,
            'filters'    => $request->only(['search', 'field', 'direction'])
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

        return redirect()->back()->with('success', 'Category created successfully');
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

        return redirect()->back()->with('success', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully');
    }
}
