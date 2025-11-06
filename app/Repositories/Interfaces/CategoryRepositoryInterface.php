<?php

namespace App\Repositories\Interfaces;

use App\Models\Category;

interface CategoryRepositoryInterface
{
    public function create(array $data): Category;
    public function delete(Category $category): bool;
    public function update(Category $category, array $data): bool;
}
