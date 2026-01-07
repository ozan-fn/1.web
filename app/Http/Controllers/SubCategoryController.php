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
        return Inertia::render('dashboard/sub-categories/index', [
            'subCategories' => SubCategory::with('category')
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                })
                ->when($request->field && $request->direction, function ($query) use ($request) {
                    $query->orderBy($request->field, $request->direction);
                }, function ($query) {
                    $query->orderBy('order');
                })
                ->get(),
            'categories' => Category::orderBy('order')->get(),
            'filters' => $request->only(['search', 'field', 'direction'])
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

        return redirect()->back();
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

        return redirect()->back();
    }

    public function destroy(SubCategory $subCategory)
    {
        $subCategory->delete();

        return redirect()->back();
    }
}
