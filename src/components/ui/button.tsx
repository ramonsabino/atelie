import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary: "bg-gold text-white hover:bg-gold-dark active:bg-gold-dark",
  secondary: "bg-bg-card text-brown hover:bg-bg-base border border-gold/30",
  ghost: "text-brown hover:bg-bg-card",
  danger: "bg-danger text-white hover:bg-red-700",
  success: "bg-success text-white hover:bg-green-700",
};

const sizes: Record<string, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-h-[44px] min-w-[44px]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
