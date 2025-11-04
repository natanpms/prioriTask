<?php

namespace App\Http\Controllers;

use App\Enums\TaskPriority;
use App\Enums\TaskStep;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::enum(TaskPriority::class)],
            'due_date' => 'nullable|date',
            'category_id' => 'nullable|exists:categories,id',
            'step' => ['required', Rule::enum(TaskStep::class)],
        ]);

        $request->user()->tasks()->create($request->all());

        return redirect()->route('tasks')->with('success', 'Task criada com sucesso.');
    }

    public function destroy(Task $task)
    {

        if ($task->user_id !== auth()->id()) {
            return redirect()->route('tasks')
                ->with('error', 'Task não encontrada.');
        }

        try {
            
            if ($task->delete()) {
                return redirect()->route('tasks')
                    ->with('success', 'Task deletada com sucesso!');
            }

        } catch (\Throwable $th) {
            return redirect()->route('tasks')
                ->with('error', 'Erro ao deletar task: '.$th->getMessage());
        }
    }

    public function update(Request $request)
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

        $task = Task::find($request->id);

        if ($task->user_id !== auth()->id()) {
             return redirect()->route('tasks')
                ->with('error', 'Você não tem permissão para editar essa task.');
        }

        $task->update($fields); 

        return redirect()->route('tasks')->with('success', 'Task atualizada com sucesso!');
    }
}
