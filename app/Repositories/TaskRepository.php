<?php

namespace App\Repositories;

use App\Models\Task;
use App\Repositories\Interfaces\TaskRepositoryInterface;

class TaskRepository implements TaskRepositoryInterface
{
    public function create(array $data): Task
    {
        return auth()->user()->tasks()->create($data);
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }

    public function find(int $id): ?Task
    {
        return Task::find($id);
    }

    public function update(Task $task, array $data): bool
    {
        return $task->update($data);
    }
}
