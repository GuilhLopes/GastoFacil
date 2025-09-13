import { DollarSign } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft`}>
        <DollarSign className="w-5 h-5 text-white" />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-semibold text-foreground`}>
          GastoFácil
        </span>
      )}
    </div>
  );
};