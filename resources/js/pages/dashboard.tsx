import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { router, usePage } from "@inertiajs/react";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  Plus,
  User,
  History,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon 
} from "lucide-react";

import { DashboardCard } from "./components/dashboard-card";

ChartJS.register(ArcElement, Tooltip, Legend);

type DashboardProps = {
  expenses: any[];
  monthlyIncome: number;
  monthlyExpenses: number;
  currentBalance: number;
  categories: { name: string; value: number; color: string }[];
};

export default function Dashboard() {
  const { expenses, monthlyIncome, monthlyExpenses, currentBalance, categories } = usePage<DashboardProps>().props;

  const chartData = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        label: 'Gastos',
        data: categories.map(c => c.value),
        backgroundColor: categories.map(c => c.color), 
        borderColor: '#020817', 
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#A1A1AA', 
          padding: 20,
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.visit("/history")}>
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Histórico</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.visit("/profile")}>
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
            value={`R$ ${currentBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<Wallet className="w-5 h-5 text-primary" />}
            change={{ value: "+0%", type: "neutral" }}
          />
          <DashboardCard
            title="Gastos do Mês"
            value={`R$ ${monthlyExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<TrendingDown className="w-5 h-5 text-destructive" />}
            change={{ value: "-0%", type: "neutral" }}
          />
          <DashboardCard
            title="Renda do Mês"
            value={`R$ ${monthlyIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            change={{ value: "0%", type: "neutral" }}
          />
        </div>

        {/* Gráfico e últimas transações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 gradient-card border-border/50 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Gastos por Categoria</h3>
            </div>

            <div className="relative h-80">
              {categories.length === 0 ? (
                 <div className="flex items-center justify-center h-full text-muted-foreground">
                   Nenhum dado de categorias disponível
                 </div>
              ) : (
                <Pie data={chartData} options={chartOptions} />
              )}
            </div>
          </Card>

          {/* Últimas transações */}
          <Card className="p-6 gradient-card border-border/50 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Últimas Transações</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.visit("/history")}>
                Ver todas
              </Button>
            </div>
            <div className="space-y-4">
              {expenses.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhuma despesa registrada
                </div>
              ) : (
                expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-fast"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${expense.type === "income" ? "bg-success/20" : "bg-destructive/20"}`}>
                        {expense.type === "income" ? (
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
                      <p className={`font-semibold ${expense.type === "income" ? "text-success" : "text-destructive"}`}>
                        {expense.type === "income" ? "+" : "-"}R$ {Math.abs(expense.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(expense.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ))
              )}
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
}