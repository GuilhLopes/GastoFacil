import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowUpRight,
  ArrowDownRight,
  Search, 
  Filter,
  Calendar,
  Download
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import Header from "./header";

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export default function History() {
  const { expenses } = usePage<{ expenses: Expense[] }>().props;

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    month: new Date().toISOString().slice(0, 7), // YYYY-MM
  });

  const categories = ["Todas", "Alimentação", "Transporte", "Lazer", "Compras", "Saúde", "Educação", "Casa", "Renda", "Renda Extra", "Outros"];

  // Filtrar transações
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || filters.category === "Todas" || expense.category === filters.category;
    const matchesMonth = expense.date.slice(0, 7) === filters.month;

    return matchesSearch && matchesCategory && matchesMonth;
  });

  // Totais
  const monthlyTotals = filteredExpenses.reduce(
    (acc, expense) => {
      if (expense.type === "income") {
        acc.income += expense.amount;
      } else {
        acc.expenses += Math.abs(expense.amount);
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Histórico de Transações" />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Filtros */}
        <Card className="p-6 gradient-card border-border/50 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nome da transação..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger className="shadow-soft focus:shadow-medium transition-smooth">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mês */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mês</label>
              <Input
                type="month"
                value={filters.month}
                onChange={(e) => handleFilterChange("month", e.target.value)}
                className="shadow-soft focus:shadow-medium transition-smooth"
              />
            </div>
          </div>
        </Card>

        {/* Resumo do mês */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 gradient-card border-border/50 shadow-soft">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Renda do Mês</p>
              <p className="text-xl font-semibold text-success">
                +R$ {monthlyTotals.income.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </Card>

          <Card className="p-4 gradient-card border-border/50 shadow-soft">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Gastos do Mês</p>
              <p className="text-xl font-semibold text-destructive">
                -R$ {monthlyTotals.expenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </Card>

          <Card className="p-4 gradient-card border-border/50 shadow-soft">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Saldo do Mês</p>
              <p
                className={`text-xl font-semibold ${
                  monthlyTotals.income - monthlyTotals.expenses >= 0
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {monthlyTotals.income - monthlyTotals.expenses >= 0 ? "+" : ""}R${" "}
                {(monthlyTotals.income - monthlyTotals.expenses).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </Card>
        </div>

        {/* Lista de transações */}
        <Card className="p-6 gradient-card border-border/50 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">
                Transações ({filteredExpenses.length})
              </h2>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma transação encontrada para os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-fast"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        expense.type === "income" ? "bg-success/20" : "bg-destructive/20"
                      }`}
                    >
                      {expense.type === "income" ? (
                        <ArrowUpRight className="w-5 h-5 text-success" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{expense.category}</span>
                        <span>•</span>
                        <span>{new Date(expense.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        expense.type === "income" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {expense.type === "income" ? "+" : "-"}R${" "}
                      {Math.abs(expense.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}