<?php

namespace App\UseCases\Task;

use App\Models\Task;
use App\Repositories\Interfaces\TaskRepositoryInterface;

class DestroyTaskUseCase
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function execute(Task $task): void
    {
        if ($task->user_id !== auth()->id()) {
            throw new \Exception('Task não encontrada.');
        }

        $this->taskRepository->delete($task);
    }
}
