<?php

namespace App\UseCases\Category;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class UpdateCategoryUseCase
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function execute(Category $category, array $data): void
    {
        if ($category->user_id !== auth()->id()) {
            throw new \Exception('Categoria não encontrada.');
        }

        $dataForDatabase = [
            'name' => $data['nome-categoria'],
            'color' => $data['color'],
        ];

        $this->categoryRepository->update($category, $dataForDatabase);
    }
}
