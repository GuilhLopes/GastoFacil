<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard'); 
    }
    return redirect()->route('login'); 
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('profile', [
            'user' => Auth::user(),
        ]);
    })->name('profile');

    Route::get('/history', [HistoryController::class, 'index'])->name('history');
});

Route::get('/add-expense', function () {
    return Inertia::render('add-expense');
})->name('add-expense');

Route::middleware(['auth'])->group(function () {
    Route::post('/expenses', [ExpenseController::class, 'store'])->name('expenses.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
