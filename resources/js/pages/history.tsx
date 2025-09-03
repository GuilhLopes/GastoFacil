import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/Logo";
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from "lucide-react";
import { router } from '@inertiajs/react'

export default function History() {
  
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    month: new Date().toISOString().slice(0, 7) // YYYY-MM format
  });

  // Dados mockados para demonstração
  const allExpenses = [
    { id: 1, name: 'Supermercado Extra', amount: -125.80, category: 'Alimentação', date: '2024-08-13', type: 'expense' },
    { id: 2, name: 'Uber para trabalho', amount: -23.50, category: 'Transporte', date: '2024-08-13', type: 'expense' },
    { id: 3, name: 'Cinema com amigos', amount: -45.00, category: 'Lazer', date: '2024-08-12', type: 'expense' },
    { id: 4, name: 'Padaria da esquina', amount: -12.30, category: 'Alimentação', date: '2024-08-12', type: 'expense' },
    { id: 5, name: 'Gasolina posto', amount: -89.90, category: 'Transporte', date: '2024-08-11', type: 'expense' },
    { id: 6, name: 'Farmácia medicamentos', amount: -67.50, category: 'Saúde', date: '2024-08-11', type: 'expense' },
    { id: 7, name: 'Freelance design', amount: 850.00, category: 'Renda Extra', date: '2024-08-10', type: 'income' },
    { id: 8, name: 'Loja de roupas', amount: -156.90, category: 'Compras', date: '2024-08-10', type: 'expense' },
    { id: 9, name: 'Restaurante delivery', amount: -42.80, category: 'Alimentação', date: '2024-08-09', type: 'expense' },
    { id: 10, name: 'Salário', amount: 3000.00, category: 'Renda', date: '2024-08-01', type: 'income' },
  ];

  const categories = ["Todas", "Alimentação", "Transporte", "Lazer", "Compras", "Saúde", "Educação", "Casa", "Renda", "Renda Extra", "Outros"];

  // Filtrar transações
  const filteredExpenses = allExpenses.filter(expense => {
    const matchesSearch = expense.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || filters.category === "Todas" || expense.category === filters.category;
    const matchesMonth = expense.date.slice(0, 7) === filters.month;
    
    return matchesSearch && matchesCategory && matchesMonth;
  });

  // Calcular totais do mês filtrado
  const monthlyTotals = filteredExpenses.reduce((acc, expense) => {
    if (expense.type === 'income') {
      acc.income += expense.amount;
    } else {
      acc.expenses += Math.abs(expense.amount);
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.visit("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Logo />
            <div className="ml-auto">
              <h1 className="text-lg font-semibold text-foreground">Histórico de Transações</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
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
                +R$ {monthlyTotals.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </Card>
          
          <Card className="p-4 gradient-card border-border/50 shadow-soft">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Gastos do Mês</p>
              <p className="text-xl font-semibold text-destructive">
                -R$ {monthlyTotals.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </Card>
          
          <Card className="p-4 gradient-card border-border/50 shadow-soft">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Saldo do Mês</p>
              <p className={`text-xl font-semibold ${
                (monthlyTotals.income - monthlyTotals.expenses) >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {(monthlyTotals.income - monthlyTotals.expenses) >= 0 ? '+' : ''}R$ {(monthlyTotals.income - monthlyTotals.expenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
              <p className="text-muted-foreground">Nenhuma transação encontrada para os filtros selecionados.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div 
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-fast"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      expense.type === 'income' ? 'bg-success/20' : 'bg-destructive/20'
                    }`}>
                      {expense.type === 'income' ? (
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
                        <span>{new Date(expense.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      expense.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {expense.type === 'income' ? '+' : '-'}R$ {Math.abs(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
};