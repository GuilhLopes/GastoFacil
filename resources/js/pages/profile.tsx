import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  User, Mail, Calendar, LogOut,
  Settings, Shield, HelpCircle, Bell, ArrowLeft
} from "lucide-react";
import Header from "./header";

type UserProps = {
  name: string;
  email: string;
  created_at: string;
  last_login?: string;
};

export default function Profile() {
  const { user } = usePage<{ user: UserProps }>().props;

  const menuItems = [
    { icon: Settings, title: "Configurações", description: "Personalize sua experiência" },
    { icon: Bell, title: "Notificações", description: "Gerencie suas notificações" },
    { icon: Shield, title: "Privacidade e Segurança", description: "Controle seus dados" },
    { icon: HelpCircle, title: "Ajuda e Suporte", description: "Tire suas dúvidas" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header title="Meu Perfil" />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Card do usuário */}
        <Card className="p-8 gradient-card border-border/50 shadow-soft">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Membro desde {new Date(user.created_at).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Card key={index} className="p-6 gradient-card border-border/50 shadow-soft cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-light rounded-xl">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-6 gradient-card border-border/50 shadow-soft">
          <Button
            variant="outline"
            type="button"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => router.post(route('logout'))} 
          >
            <LogOut className="w-4 h-4" /> Sair da Conta
          </Button>
        </Card>
      </main>
    </div>
  );
}
