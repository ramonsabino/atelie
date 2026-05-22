"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { servicoSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function listarServicos() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.from("servicos").select("*").order("nome");
  return data ?? [];
}

export async function criarServico(formData: FormData) {
  const validated = servicoSchema.safeParse({
    nome: formData.get("nome"),
    preco: formData.get("preco"),
    duracao_minutos: formData.get("duracao_minutos"),
  });

  if (!validated.success) {
    return { error: "Dados inválidos", details: validated.error.flatten().fieldErrors };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("servicos").insert(validated.data);

  if (error) return { error: error.message };
  revalidatePath("/mais");
  return { success: true };
}
