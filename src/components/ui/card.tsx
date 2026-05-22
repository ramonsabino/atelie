import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "highlight";
}

const cardVariants: Record<string, string> = {
  default: "bg-white border border-brown/10",
  gold: "bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20",
  highlight: "bg-gradient-to-br from-bg-card to-white border border-gold/15",
};

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 shadow-sm",
        cardVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
