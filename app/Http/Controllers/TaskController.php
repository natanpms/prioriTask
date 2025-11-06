<?php

namespace App\Http\Controllers;

use App\Enums\TaskPriority;
use App\Enums\TaskStep;
use App\Models\Task;
use App\UseCases\Task\DestroyTaskUseCase;
use App\UseCases\Task\StoreTaskUseCase;
use App\UseCases\Task\UpdateTaskUseCase;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function store(Request $request, StoreTaskUseCase $storeTaskUseCase)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::enum(TaskPriority::class)],
            'due_date' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'step' => ['required', Rule::enum(TaskStep::class)],
        ]);

        try {
            $storeTaskUseCase->execute($request->all());
            return redirect()->route('tasks')->with('success', 'Task criada com sucesso.');
        } catch (\Throwable $th) {
            return redirect()->route('tasks')->with('error', 'Erro ao criar task: ' . $th->getMessage());
        }
    }

    public function destroy(Task $task, DestroyTaskUseCase $destroyTaskUseCase)
    {
        try {
            $destroyTaskUseCase->execute($task);
            return redirect()->route('tasks')->with('success', 'Task deletada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('tasks')->with('error', 'Erro ao deletar task: ' . $th->getMessage());
        }
    }

    public function update(Request $request, UpdateTaskUseCase $updateTaskUseCase)
    {
        $fields = $request->validate([
            'id' => 'required|exists:tasks,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::enum(TaskPriority::class)],
            'due_date' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'step' => ['required', Rule::enum(TaskStep::class)],
        ]);

        try {
            $updateTaskUseCase->execute($request->id, $fields);
            return redirect()->route('tasks')->with('success', 'Task atualizada com sucesso!');
        } catch (\Throwable $th) {
            return redirect()->route('tasks')->with('error', 'Erro ao atualizar task: ' . $th->getMessage());
        }
    }
}
