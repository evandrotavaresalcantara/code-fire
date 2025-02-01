import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Custom404() {
  return (
    <section className="flex flex-col items-center justify-center min-h-dvh gap-4">
      <h1 className="text-xl">404 - Página não encontrada</h1>
      <p className="text-zinc-500 text-lg">
        A página que você está tentando acessar não existe.
      </p>
      <Link href="/home">
        <Button className="btn-primary text-white text-xl py-6">
          Retornar para Home
        </Button>
      </Link>
    </section>
  );
}
