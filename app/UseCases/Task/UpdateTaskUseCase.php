<?php

namespace App\UseCases\Task;

use App\Repositories\Interfaces\TaskRepositoryInterface;

class UpdateTaskUseCase
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function execute(int $id, array $data): void
    {
        $task = $this->taskRepository->find($id);

        if (!$task || $task->user_id !== auth()->id()) {
            throw new \Exception('Você não tem permissão para editar essa task.');
        }

        $this->taskRepository->update($task, $data);
    }
}
