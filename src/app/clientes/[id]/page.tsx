import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { buscarCliente } from "@/lib/actions/clientes";
import { listarAgendamentos } from "@/lib/actions/agendamentos";
import { ClientePerfil } from "./cliente-perfil";

export default async function ClienteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await verifySession();
  if (!session) redirect("/login");

  const { id } = await params;
  const [cliente, todosAgendamentos] = await Promise.all([
    buscarCliente(id),
    listarAgendamentos(),
  ]);

  if (!cliente) return <div className="text-center py-12 text-muted">Cliente não encontrado</div>;

  const historico = todosAgendamentos.filter((a) => a.cliente_id === id);

  return <ClientePerfil cliente={cliente} historico={historico} />;
}
