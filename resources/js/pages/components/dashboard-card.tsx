import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string;
    type: "positive" | "negative" | "neutral";
  };
  className?: string;
}

export const DashboardCard = ({ title, value, icon, change, className }: DashboardCardProps) => {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive", 
    neutral: "text-muted-foreground"
  };

  return (
    <Card className={`p-6 gradient-card border-border/50 shadow-soft hover:shadow-medium transition-smooth ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary-light rounded-xl">
          {icon}
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColors[change.type]}`}>
            {change.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
      </div>
    </Card>
  );
};