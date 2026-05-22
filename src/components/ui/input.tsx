import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-brown">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full h-11 px-4 rounded-xl border bg-white text-brown placeholder:text-muted/60",
          "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
          "transition-all duration-200",
          error ? "border-danger ring-danger/20" : "border-brown/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
