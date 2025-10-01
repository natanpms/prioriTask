<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


     Route::get('categories', function () {
        return Inertia::render('categories', [
            'categories'=> Category::where('user_id', auth()->id())->select('id', 'name', 'color')->get()
        ]);
    })->name('categories');

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    Route::get('tasks', function () {
          return Inertia::render('tasks', [
            'tasks'=> Task::where('user_id', auth()->id())->select('title', 'description', 'priority', 'due_date', 'category_id')->get(),
            'categories'=> Category::where('user_id', auth()->id())->select('id', 'name', 'color')->get()
        ]); 
    })->name('tasks');

    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::post('/tasks', [TaskController::class, 'destroy'])->name('tasks.destroy');
    Route::post('/tasks', [TaskController::class, 'update'])->name('tasks.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
