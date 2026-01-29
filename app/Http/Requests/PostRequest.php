<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => ['nullable', 'exists:categories,id', 'required_without:category_name'],
            'category_name' => ['nullable', 'string', 'max:255', 'required_without:category_id'],
            'sub_category_id' => 'nullable|exists:sub_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'required|boolean',
            'thumbnail' => 'nullable|image|max:10240',
            'tags' => 'nullable|array',
            'tags.*' => 'nullable|string|max:100',
            'published_at' => ['nullable', 'date'],
        ];
    }
}
