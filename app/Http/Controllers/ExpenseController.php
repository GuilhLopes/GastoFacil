<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'date' => 'required|date',
        ]);

        Expense::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'amount' => $request->amount,
            'category' => $request->category,
            'type' => $request->type,
            'date' => $request->date,
        ]);

        return redirect()->route('dashboard')->with('success', 'Gasto registrado com sucesso!');
    }
}
