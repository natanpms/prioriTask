<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function create(array $data): Category
    {
        return Category::create($data);
    }

    public function delete(Category $category): bool
    {
        $category->tasks()->delete();
        return $category->delete();
    }

    public function update(Category $category, array $data): bool
    {
        return $category->update($data);
    }
}
