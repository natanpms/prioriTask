<?php

namespace App\UseCases\Task;

use App\Repositories\Interfaces\TaskRepositoryInterface;

class StoreTaskUseCase
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function execute(array $data): void
    {
        $this->taskRepository->create($data);
    }
}
