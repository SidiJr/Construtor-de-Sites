"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Função que será passada para o SignupForm
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const nome = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const senha = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirm = (
      form.elements.namedItem("confirm-password") as HTMLInputElement
    ).value;

    if (senha !== confirm) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao criar conta.");
      }

      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm onSubmit={handleSubmit} />
            {loading && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Criando conta...
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/login.jpg"
          width={957}
          height={835}
          alt="Imagem de fundo"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
