import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Meu App",
  description: "Aplicação com Next.js e DaisyUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" data-theme="light">
      <body className="flex flex-col min-h-screen">
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
