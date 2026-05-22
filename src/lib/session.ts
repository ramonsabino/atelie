import "server-only";
import { cookies } from "next/headers";
import { createServerSupabase } from "./supabase/server";

const ALLOWED_EMAIL = process.env.ALLOWED_EMAIL || "luana@atelie.com";

export async function verifySession() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || user.email !== ALLOWED_EMAIL) {
    return null;
  }

  return { id: user.id, email: user.email };
}

export async function getSession() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
