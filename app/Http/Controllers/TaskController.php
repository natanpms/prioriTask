<?php

namespace App\Http\Controllers;

use App\Enums\TaskPriority;
use App\Enums\TaskStep;
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
            'step' => ['required', Rule::enum(TaskStep::class)]
        ]);

        $request->user()->tasks()->create($request->all());

        return redirect()->route('tasks')->with('success', 'Task criada com sucesso.');
    }
}