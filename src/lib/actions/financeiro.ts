"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { financeiroSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function listarFinanceiro(mes?: number, ano?: number) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from("financeiro")
    .select("*")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });

  if (mes && ano) {
    const start = `${ano}-${String(mes).padStart(2, "0")}-01`;
    const lastDay = new Date(ano, mes, 0).getDate();
    const end = `${ano}-${String(mes).padStart(2, "0")}-${lastDay}`;
    query = query.gte("data", start).lte("data", end);
  }

  const { data } = await query;
  return data ?? [];
}

export async function criarLancamento(formData: FormData) {
  const validated = financeiroSchema.safeParse({
    tipo: formData.get("tipo"),
    valor: formData.get("valor"),
    descricao: formData.get("descricao"),
    data: formData.get("data"),
    agendamento_id: formData.get("agendamento_id") || null,
  });

  if (!validated.success) {
    return { error: "Dados inválidos", details: validated.error.flatten().fieldErrors };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("financeiro").insert(validated.data);

  if (error) return { error: error.message };
  revalidatePath("/financeiro");
  return { success: true };
}
