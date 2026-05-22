"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { agendamentoSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function listarAgendamentos(data?: string) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from("agendamentos")
    .select("*, cliente:clientes(*), servico:servicos(*)")
    .order("data_hora");

  if (data) {
    const start = `${data}T00:00:00.000Z`;
    const end = `${data}T23:59:59.999Z`;
    query = query.gte("data_hora", start).lte("data_hora", end);
  }

  const { data: result } = await query;
  return result ?? [];
}

export async function criarAgendamento(formData: FormData) {
  const validated = agendamentoSchema.safeParse({
    cliente_id: formData.get("cliente_id"),
    servico_id: formData.get("servico_id"),
    data_hora: formData.get("data_hora"),
    status: formData.get("status") || "Pendente",
  });

  if (!validated.success) {
    return { error: "Dados inválidos", details: validated.error.flatten().fieldErrors };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("agendamentos").insert(validated.data);

  if (error) {
    if (error.message.includes("unique_data_hora")) {
      return { error: "Já existe um agendamento neste horário." };
    }
    return { error: error.message };
  }

  revalidatePath("/agenda");
  return { success: true };
}

export async function atualizarStatusAgendamento(id: string, status: string) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("agendamentos").update({ status: status as any }).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/agenda");
  return { success: true };
}

export async function deletarAgendamento(id: string) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("agendamentos").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/agenda");
  return { success: true };
}
