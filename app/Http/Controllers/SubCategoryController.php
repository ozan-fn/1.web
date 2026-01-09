<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    public function index(Request $request)
    {
        $subCategories = SubCategory::with('category')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      // Bonus: Bisa cari berdasarkan nama kategori induk
                      ->orWhereHas('category', function($cat) use ($search) {
                          $cat->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when($request->filled(['field', 'direction']), function ($query) use ($request) {
                $direction = strtolower($request->direction) === 'desc' ? 'desc' : 'asc';
                $query->orderBy($request->field, $direction);
            }, function ($query) {
                $query->orderBy('order');
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/sub-categories/index', [
            'subCategories' => $subCategories,
            'categories'    => Category::orderBy('order')->get(['id', 'name']),
            'filters'       => $request->only(['search', 'field', 'direction'])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_nav' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        SubCategory::create($validated);

        return redirect()->back()->with('success', 'Subcategory created successfully');
    }

    public function update(Request $request, SubCategory $subCategory)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer',
            'is_nav' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $subCategory->update($validated);

        return redirect()->back()->with('success', 'Subcategory updated successfully');
    }

    public function destroy(SubCategory $subCategory)
    {
        $subCategory->delete();

        return redirect()->back()->with('success', 'Subcategory deleted successfully');
    }
}
