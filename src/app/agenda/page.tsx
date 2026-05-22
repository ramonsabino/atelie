import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { listarAgendamentos } from "@/lib/actions/agendamentos";
import { listarClientes } from "@/lib/actions/clientes";
import { listarServicos } from "@/lib/actions/servicos";
import { AgendaContent } from "./agenda-content";

export default async function AgendaPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const hoje = new Date().toISOString().slice(0, 10);
  const [agendamentos, clientes, servicos] = await Promise.all([
    listarAgendamentos(hoje),
    listarClientes(),
    listarServicos(),
  ]);

  return (
    <div>
      <AgendaContent
        agendamentos={agendamentos}
        clientes={clientes}
        servicos={servicos}
        dataInicial={hoje}
      />
    </div>
  );
}
