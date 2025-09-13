<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Expense;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('history', [
            'expenses' => Expense::where('user_id', $user->id)
                ->orderBy('date', 'desc')
                ->get(),
        ]);
    }
}
