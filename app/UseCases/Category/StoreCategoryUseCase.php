<?php

namespace App\UseCases\Category;

use App\Repositories\Interfaces\CategoryRepositoryInterface;

class StoreCategoryUseCase
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function execute(array $data): void
    {
        $dataForDatabase = [
            'name' => $data['nome-categoria'],
            'color' => $data['color'],
            'user_id' => auth()->id(),
        ];

        $this->categoryRepository->create($dataForDatabase);
    }
}
