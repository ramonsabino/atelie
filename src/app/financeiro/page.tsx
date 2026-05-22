import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { listarFinanceiro } from "@/lib/actions/financeiro";
import { FinanceiroContent } from "./financeiro-content";

export default async function FinanceiroPage() {
  const session = await verifySession();
  if (!session) redirect("/login");

  const hoje = new Date();
  const transacoes = await listarFinanceiro(hoje.getMonth() + 1, hoje.getFullYear());

  return <FinanceiroContent transacoes={transacoes} mes={hoje.getMonth()} ano={hoje.getFullYear()} />;
}
