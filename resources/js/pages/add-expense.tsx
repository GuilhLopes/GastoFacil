import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calendar, Tag, FileText } from "lucide-react";
import { router } from '@inertiajs/react'
import Header from "./header";

export default function AddExpense() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    "Alimentação",
    "Transporte", 
    "Lazer",
    "Compras",
    "Saúde",
    "Educação",
    "Casa",
    "Outros"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simular salvamento
    console.log("Gasto adicionado:", formData);
    
    router.visit('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header title="Adicionar Gasto" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 gradient-card border-border/50 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome do gasto */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Nome do Gasto *
                </Label>
                <Input
                  id="name"
                  placeholder="Ex: Almoço no restaurante"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>

              {/* Valor */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Valor *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Categoria *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="shadow-soft focus:shadow-medium transition-smooth">
                    <SelectValue placeholder="Selecione uma categoria" />
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

              {/* Data */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="shadow-soft focus:shadow-medium transition-smooth"
                />
              </div>

              {/* Resumo */}
              {formData.name && formData.amount && formData.category && (
                <Card className="p-4 bg-primary-light border-primary/20">
                  <h3 className="font-medium text-primary mb-2">Resumo</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Gasto:</span> {formData.name}</p>
                    <p><span className="text-muted-foreground">Valor:</span> R$ {parseFloat(formData.amount || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p><span className="text-muted-foreground">Categoria:</span> {formData.category}</p>
                    <p><span className="text-muted-foreground">Data:</span> {new Date(formData.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </Card>
              )}

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.visit('/dashboard')}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  className="flex-1"
                >
                  Salvar Gasto
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};