import { cn } from "@/lib/utils";

interface BadgeProps {
  variant: "Confirmado" | "Pendente" | "Concluído" | "Cancelado";
  className?: string;
}

const badgeColors: Record<string, string> = {
  Confirmado: "bg-success/15 text-success border-success/20",
  Pendente: "bg-warning/15 text-warning border-warning/20",
  "Concluído": "bg-blue-100 text-blue-700 border-blue-200",
  Cancelado: "bg-danger/15 text-danger border-danger/20",
};

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        badgeColors[variant],
        className
      )}
    >
      {variant}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={status as BadgeProps["variant"]} />;
}
