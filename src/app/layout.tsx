import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luana Ingrid - Ateliê de Beleza",
  description: "Sistema de gerenciamento do ateliê",
  icons: { icon: "/fav.png", apple: "/fav.png" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Luana Ingrid" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C89F5B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
