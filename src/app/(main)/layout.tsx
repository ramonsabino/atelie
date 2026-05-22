import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";
import { AppShell } from "@/components/layout/app-shell";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();
  if (!session) redirect("/login");

  return <AppShell>{children}</AppShell>;
}
