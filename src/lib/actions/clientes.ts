"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { clienteSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function listarClientes() {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .order("nome");
  return data ?? [];
}

export async function buscarCliente(id: string) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export async function criarCliente(formData: FormData) {
  const validated = clienteSchema.safeParse({
    nome: formData.get("nome"),
    telefone: formData.get("telefone") || null,
    instagram: formData.get("instagram") || null,
    foto_url: formData.get("foto_url") || null,
    anotacoes: formData.get("anotacoes") || null,
  });

  if (!validated.success) {
    return { error: "Dados inválidos", details: validated.error.flatten().fieldErrors };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("clientes").insert(validated.data);

  if (error) return { error: error.message };
  revalidatePath("/clientes");
  return { success: true };
}

export async function atualizarCliente(id: string, formData: FormData) {
  const validated = clienteSchema.safeParse({
    nome: formData.get("nome"),
    telefone: formData.get("telefone") || null,
    instagram: formData.get("instagram") || null,
    foto_url: formData.get("foto_url") || null,
    anotacoes: formData.get("anotacoes") || null,
  });

  if (!validated.success) {
    return { error: "Dados inválidos", details: validated.error.flatten().fieldErrors };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.from("clientes").update(validated.data).eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/clientes");
  return { success: true };
}

export async function deletarCliente(id: string) {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("clientes").delete().eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/clientes");
  return { success: true };
}
