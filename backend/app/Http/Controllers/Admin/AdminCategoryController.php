<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    /**
     * List categories
     */
    public function index(Request $request)
    {
        $query = Category::with('parent');

        // Search
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Parent category filter
        if ($request->filled('parent_id')) {
            $query->where('parent_id', $request->parent_id);
        }

        $categories = $query
            ->orderBy('name')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'message' => 'Categories fetched successfully.',
            'data' => $categories,
            'errors' => null,
        ], 200);

    }

    /**
     * Create category
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug',
            'status' => 'nullable|in:active,inactive',
        ]);

        // Generate slug if not provided
        $validated['slug'] = $validated['slug']
            ?? Str::slug($validated['name']);

        // Make sure generated slug is unique
        if (Category::where('slug', $validated['slug'])->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Category slug already exists.',
                'data' => null,
                'errors' => [
                    'slug' => [
                        'The generated slug already exists.'
                    ]
                ],
            ], 422);
        }

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category created successfully.',
            'data' => $category,
            'errors' => null,
        ], 201);
    }

    /**
     * Show category
     */
    public function show($id)
    {
        $category = Category::with([
            'parent',
            'children',
            'companies',
        ])->find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Category fetched successfully.',
            'data' => $category,
            'errors' => null,
        ], 200);
    }

    /**
     * Update category
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        $validated = $request->validate([
            'parent_id' => 'nullable|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:categories,slug,' . $id,
            'status' => 'nullable|in:active,disabled',
        ]);

        // Generate slug when name changes and slug isn't provided
        if (
            isset($validated['name']) &&
            !isset($validated['slug'])
        ) {
            $validated['slug'] = Str::slug(
                $validated['name']
            );
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Category updated successfully.',
            'data' => $category->fresh(),
            'errors' => null,
        ], 200);
    }

    /**
     * Delete category
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found.',
                'data' => null,
                'errors' => null,
            ], 404);
        }

        // Prevent deletion if category has children
        if ($category->children()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category because it has child categories.',
                'data' => null,
                'errors' => null,
            ], 409);
        }

        // Prevent deletion if companies are using it
        if ($category->companies()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category because companies are assigned to it.',
                'data' => null,
                'errors' => null,
            ], 409);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully.',
            'data' => null,
            'errors' => null,
        ], 200);
    }
}
