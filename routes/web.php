<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpenseController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/profile', function () {
    return Inertia::render('profile');
})->name('profile');

Route::get('/add-expense', function () {
    return Inertia::render('add-expense');
})->name('add-expense');

Route::middleware(['auth'])->group(function () {
    Route::post('/expenses', [ExpenseController::class, 'store'])->name('expenses.store');
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/history', function () {
    return Inertia::render('history');
})->name('history');

{/*
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
}); 
*/}

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
