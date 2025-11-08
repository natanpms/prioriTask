<?php

namespace App\UseCases\Category;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class DestroyCategoryUseCase
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function execute(Category $category): void
    {
        if ($category->user_id !== auth()->id()) {
            throw new \Exception('Categoria não encontrada.');
        }

        $this->categoryRepository->delete($category);
    }
}
