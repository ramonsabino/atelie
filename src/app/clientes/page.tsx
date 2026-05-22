import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { listarClientes } from "@/lib/actions/clientes";
import { ClientesContent } from "./clientes-content";

export default async function ClientesPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const clientes = await listarClientes();

  return <ClientesContent clientes={clientes} />;
}
