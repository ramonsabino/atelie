import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { listarAgendamentos } from "@/lib/actions/agendamentos";
import { listarClientes } from "@/lib/actions/clientes";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const hoje = new Date().toISOString().slice(0, 10);
  const [agendamentos, clientes] = await Promise.all([
    listarAgendamentos(hoje),
    listarClientes(),
  ]);

  const faturamentoHoje = agendamentos
    .filter((a) => a.status === "Concluído")
    .reduce((acc, a) => acc + Number((a.servico as any)?.preco || 0), 0);

  const manutencoesProximas = clientes
    .filter((c) => {
      if (!c.data_ultima_manutencao) return false;
      const dias = Math.floor(
        (Date.now() - new Date(c.data_ultima_manutencao).getTime()) / (1000 * 60 * 60 * 24)
      );
      return dias >= 20 && dias <= 30;
    })
    .sort((a, b) => {
      const da = a.data_ultima_manutencao ? new Date(a.data_ultima_manutencao).getTime() : 0;
      const db = b.data_ultima_manutencao ? new Date(b.data_ultima_manutencao).getTime() : 0;
      return da - db;
    });

  const aniversariantes = clientes.filter((c) => {
    if (!c.telefone) return false;
    const hojeData = new Date();
    // Simulate - in real app, check birthday from a proper date field
    return false;
  });

  return (
    <AppShell>
      <DashboardContent
        totalAtendimentos={agendamentos.length}
        faturamentoHoje={faturamentoHoje}
        proximoAtendimento={agendamentos.find((a) => a.status !== "Cancelado") || null}
        manutencoesProximas={manutencoesProximas}
        aniversariantes={aniversariantes}
        totalClientes={clientes.length}
      />
    </AppShell>
  );
}
