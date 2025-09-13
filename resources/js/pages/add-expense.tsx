import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calendar, Tag, FileText } from "lucide-react";
import { router } from "@inertiajs/react";
import Header from "./header";

export default function AddExpense() {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    type: "expense", // novo campo
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Compras",
    "Saúde",
    "Educação",
    "Casa",
    "Outros",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/expenses", formData); 
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Adicionar Gasto" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 gradient-card border-border/50 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Nome *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ex: Almoço no restaurante"
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
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0,00"
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Categoria *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
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

              {/* Tipo */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">Tipo *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Entrada</SelectItem>
                    <SelectItem value="expense">Saída</SelectItem>
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
                />
              </div>

              {/* Resumo */}
              {formData.name && formData.amount && formData.category && (
                <Card className="p-4 bg-primary-light border-primary/20">
                  <h3 className="font-medium text-primary mb-2">Resumo</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Nome:</span>{" "}
                      {formData.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Valor:</span> R${" "}
                      {parseFloat(formData.amount || "0").toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Categoria:</span>{" "}
                      {formData.category}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Tipo:</span>{" "}
                      {formData.type === "income" ? "Entrada" : "Saída"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Data:</span>{" "}
                      {new Date(formData.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </Card>
              )}

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.visit("/dashboard")}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
