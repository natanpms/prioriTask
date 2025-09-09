<?php

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
        return Inertia::render('categories');
    })->name('categories');

    Route::get('tasks', function () {
        return Inertia::render('tasks');
    })->name('tasks');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
