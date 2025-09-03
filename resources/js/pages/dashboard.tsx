import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { router } from '@inertiajs/react';
import { 
  Wallet, 
  TrendingDown, 
  TrendingUp, 
  Plus,
  User,
  Settings,
  History,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { PieChart as RechartsChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardCard } from "./components/dashboard-card";

export default function Dashboard() {
  // Dados mockados para demonstração
  const [currentBalance] = useState(2450.00);
  const [monthlyExpenses] = useState(1180.50);
  const [monthlyIncome] = useState(3000.00);

  // Dados para o gráfico de categorias
  const expenseData = [
    { name: 'Alimentação', value: 450, color: 'hsl(160 60% 45%)' },
    { name: 'Transporte', value: 280, color: 'hsl(200 70% 50%)' },
    { name: 'Lazer', value: 220, color: 'hsl(160 50% 60%)' },
    { name: 'Compras', value: 180, color: 'hsl(200 60% 65%)' },
    { name: 'Outros', value: 50.50, color: 'hsl(180 55% 55%)' }
  ];

  // Últimas transações mockadas
  const recentExpenses = [
    { id: 1, name: 'Supermercado', amount: -85.30, category: 'Alimentação', date: '2024-08-13', type: 'expense' },
    { id: 2, name: 'Uber', amount: -23.50, category: 'Transporte', date: '2024-08-12', type: 'expense' },
    { id: 3, name: 'Cinema', amount: -45.00, category: 'Lazer', date: '2024-08-11', type: 'expense' },
    { id: 4, name: 'Salário', amount: 3000.00, category: 'Renda', date: '2024-08-01', type: 'income' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.visit("/history")}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Histórico</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.visit("/profile")}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Perfil</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Saldo Atual"
            value={`R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={<Wallet className="w-5 h-5 text-primary" />}
            change={{ value: "+12.5%", type: "positive" }}
          />
          
          <DashboardCard
            title="Gastos do Mês"
            value={`R$ ${monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={<TrendingDown className="w-5 h-5 text-destructive" />}
            change={{ value: "-8.3%", type: "positive" }}
          />
          
          <DashboardCard
            title="Renda do Mês"
            value={`R$ ${monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            change={{ value: "0%", type: "neutral" }}
          />
        </div>

        {/* Gráfico e últimas transações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de categorias */}
          <Card className="p-6 gradient-card border-border/50 shadow-soft">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Gastos por Categoria</h3>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsChart data={expenseData}>
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Tooltip 
                    formatter={(value: number) => [
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                      'Valor'
                    ]}
                  />
                  <Legend />
                </RechartsChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Últimas transações */}
          <Card className="p-6 gradient-card border-border/50 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Últimas Transações</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.visit("/history")}
              >
                Ver todas
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div 
                  key={expense.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-fast"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      expense.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {expense.type === 'income' ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.name}</p>
                      <p className="text-sm text-muted-foreground">{expense.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${
                      expense.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {expense.type === 'income' ? '+' : ''}R$ {Math.abs(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Botão de ação flutuante */}
        <Button 
          onClick={() => router.visit("/add-expense")}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 p-3 rounded-full shadow-large hover:shadow-xl transition-smooth sm:h-auto sm:w-auto sm:rounded-lg sm:px-6"
        >
          <Plus className="w-6 h-6" />
          <span className="hidden sm:inline ml-2">Adicionar Gasto</span>
        </Button>
      </main>
    </div>
  );
};