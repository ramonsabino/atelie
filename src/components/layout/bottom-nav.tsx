"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Wallet, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Início" },
  { href: "/agenda", icon: Calendar, label: "Agenda" },
  { href: "/clientes", icon: Users, label: "Clientes" },
  { href: "/financeiro", icon: Wallet, label: "Financeiro" },
  { href: "/mais", icon: MoreHorizontal, label: "Mais" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brown/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[48px] px-2 rounded-xl transition-colors",
                isActive ? "text-gold" : "text-muted hover:text-brown"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[11px] font-medium leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
