"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL || "luana@atelie.com";

export type LoginState = {
  errors?: { email?: string[]; password?: string[] };
  message?: string;
} | null;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  if (email !== ALLOWED_EMAIL) {
    return { message: "Acesso restrito. Entre em contato com a administração." };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { message: "E-mail ou senha inválidos." };
    }
    return { message: "Erro ao fazer login. Tente novamente." };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}
