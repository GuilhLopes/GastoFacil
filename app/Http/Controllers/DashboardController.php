<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Expense;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Pega despesas do usuário logado
        $expenses = Expense::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Calcula renda, gastos e saldo
        $monthlyIncome = Expense::where('user_id', $user->id)
            ->where('type', 'income')
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        $monthlyExpenses = Expense::where('user_id', $user->id)
            ->where('type', 'expense')
            ->whereMonth('created_at', now()->month)
            ->sum('amount');

        $currentBalance = $monthlyIncome - $monthlyExpenses;

        // Agrupamento por categoria (para o gráfico)
        $categories = Expense::where('user_id', $user->id)
            ->where('type', 'expense')
            ->whereMonth('created_at', now()->month)
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->category,
                    'value' => $item->total,
                    'color' => 'hsl(' . rand(0, 360) . ' 60% 50%)' // cor randômica
                ];
            });

        return Inertia::render('dashboard', [
            'expenses' => $expenses,
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpenses' => $monthlyExpenses,
            'currentBalance' => $currentBalance,
            'categories' => $categories,
        ]);
    }
}
