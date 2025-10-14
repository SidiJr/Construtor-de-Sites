import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Index() {
  return (
    <section
      className={cn(
        "relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden",
        "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
      )}
    >
      {/* Fundo */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          Bem-vindo ao{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Construtor de Sites!
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          Crie seu próprio site de forma rápida, moderna e responsiva.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/login">Começar agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
