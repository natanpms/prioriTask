<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use App\Models\Category;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'tasks' => Task::where('user_id', auth()->id())->select('id', 'title', 'description', 'priority', 'step', 'due_date', 'category_id')->get(),
            'categories' => Category::where('user_id', auth()->id())->withCount('tasks')->get(['id', 'name', 'color']),
            'tasksDueDate' => Task::where('user_id', auth()->id())
                ->whereNot('step', 'concluido')
                ->where('due_date', '<', Carbon::today()) // pega apenas vencidas
                ->orderBy('due_date', 'desc')
                ->get(),
            'tasksNotDueDate' => Task::where('user_id', auth()->id())
                ->whereNot('step', 'concluido')
                ->where('due_date', '>=', Carbon::today())
                ->orderBy('due_date', 'asc')->get(),
        ]);
    })->name('dashboard');

    Route::get('categories', function () {
        return Inertia::render('categories', [
            'categories' => Category::where('user_id', auth()->id())->select('id', 'name', 'color')->get(),
        ]);
    })->name('categories');

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    Route::get('tasks', function () {
        return Inertia::render('tasks', [
            'tasks' => Task::where('user_id', auth()->id())->select('id', 'title', 'description', 'priority', 'step', 'due_date', 'category_id')->get(),
            'categories' => Category::where('user_id', auth()->id())->select('id', 'name', 'color')->get(),
        ]);
    })->name('tasks');

    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::patch('/tasks', [TaskController::class, 'update'])->name('tasks.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
