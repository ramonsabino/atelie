"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-base px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-white font-serif text-3xl font-bold">L</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-brown leading-tight">
            Luana Ingrid
          </h1>
          <p className="font-serif text-gold-dark text-sm mt-1">Ateliê de Beleza</p>
        </div>

        <form action={action} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            autoComplete="email"
            error={state?.errors?.email?.[0]}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            autoComplete="current-password"
            error={state?.errors?.password?.[0]}
          />

          {state?.message && (
            <p className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-3 text-center">
              {state.message}
            </p>
          )}

          <Button type="submit" size="lg" disabled={pending} className="w-full gap-2">
            {pending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {pending ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="text-xs text-muted text-center mt-8">
          Acesso restrito à proprietária
        </p>
      </div>
    </div>
  );
}
