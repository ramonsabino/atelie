import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { listarServicos } from "@/lib/actions/servicos";
import { ServicosManager } from "./servicos-manager";

export default async function MaisPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const servicos = await listarServicos();

  return (
    <AppShell>
      <div className="pb-4">
        <h2 className="font-serif text-xl font-bold text-brown mb-4">Mais</h2>

        <Card variant="gold" className="mb-5">
          <h3 className="font-semibold text-brown mb-3">Gerenciar Serviços</h3>
          <ServicosManager servicos={servicos} />
        </Card>

        <Card>
          <h3 className="font-semibold text-brown mb-2">Sobre</h3>
          <p className="text-sm text-muted leading-relaxed">
            Luana Ingrid - Ateliê de Beleza
          </p>
          <p className="text-xs text-muted mt-1">
            Sistema de gerenciamento profissional v1.0
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
