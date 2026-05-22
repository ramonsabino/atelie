import { BottomNav } from "./bottom-nav";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-bg-base">
      <header className="sticky top-0 z-30 bg-bg-base/95 backdrop-blur-sm border-b border-brown/10 px-4 py-3 flex items-center justify-between">
        <h1 className="font-serif text-lg font-bold text-brown leading-tight">
          Luana Ingrid
        </h1>
        <form action={logout}>
          <button
            type="submit"
            className="p-2 hover:bg-bg-card rounded-full transition-colors"
            aria-label="Sair"
          >
            <LogOut className="w-5 h-5 text-muted hover:text-danger" />
          </button>
        </form>
      </header>

      <main className="flex-1 px-4 pt-4 pb-24 overflow-y-auto">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
