import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar,
  LogOut,
  Settings,
  Shield,
  HelpCircle,
  Bell
} from "lucide-react";
import Header from "./header";

export default function Profile() {

  // Dados mockados do usuário (em produção viriam do Google Auth)
  const userData = {
    name: "João Silva",
    email: "joao.silva@email.com",
    photoUrl: "/placeholder.svg", // Em produção seria a foto do Google
    joinDate: "2024-01-15",
    lastLogin: "2024-08-13"
  };

  const menuItems = [
    {
      icon: Settings,
      title: "Configurações",
      description: "Personalize sua experiência"
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Gerencie suas notificações",
    },
    {
      icon: Shield,
      title: "Privacidade e Segurança",
      description: "Controle seus dados",
    },
    {
      icon: HelpCircle,
      title: "Ajuda e Suporte",
      description: "Tire suas dúvidas"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header title="Meu Perfil" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Card do perfil do usuário */}
        <Card className="p-8 gradient-card border-border/50 shadow-soft">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-card flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Informações do usuário */}
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">{userData.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Membro desde {new Date(userData.joinDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            {/* Estatísticas rápidas */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground">Transações</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">8</p>
                <p className="text-sm text-muted-foreground">Meses Ativos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">R$ 2.4k</p>
                <p className="text-sm text-muted-foreground">Economia</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu de opções */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className="p-6 gradient-card border-border/50 shadow-soft hover:shadow-medium transition-smooth cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-light rounded-xl">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
              </div>
            </Card>
          ))}
        </div>

        {/* Informações da conta */}
        <Card className="p-6 gradient-card border-border/50 shadow-soft">
          <h3 className="font-semibold text-foreground mb-4">Informações da Conta</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Último acesso:</span>
              <span className="text-foreground">{new Date(userData.lastLogin).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versão do app:</span>
              <span className="text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plano:</span>
              <span className="text-primary font-medium">Gratuito</span>
            </div>
          </div>
        </Card>

        {/* Botão de logout */}
        <Card className="p-6 gradient-card border-border/50 shadow-soft">
          <Button 
            variant="outline" 
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Sair da Conta
          </Button>
        </Card>
      </main>
    </div>
  );
};