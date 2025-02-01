/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import UpdatePerfilForm from "@/components/forms/perfil/updatePerfilForm/updatePerfil-form";
import { Button } from "@/components/ui/button";
import { API_PERFIS } from "@/lib";
import { findPerfilID } from "@/services/perfis/findPerfilID";
import { Perfil } from "@/types/Entities";
import { IconChevronLeft } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

const usePerfilStore = create<{
  perfil: Perfil | null | undefined;
  fetchPerfil: (id: string) => Promise<void>;
  reset: () => Promise<void>;
}>((set) => ({
  perfil: undefined,
  fetchPerfil: async (id: string) => {
    try {
      const perfil = await findPerfilID(id);
      set({ perfil });
    } catch (error) {
      set({ perfil: null });
    }
  },
  reset: async () => {
    set({ perfil: undefined });
  },
}));

export default function PerfilPage({
  params,
}: {
  params: { idperfil: string };
}) {
  const { perfil, fetchPerfil, reset } = usePerfilStore();

  useEffect(() => {
    reset();
    fetchPerfil(params.idperfil);
  }, [fetchPerfil, params.idperfil, reset]);

  if (perfil === undefined) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (perfil === null) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full gap-4 container">
      <div className="flex w-full justify-between">
        <Link href={API_PERFIS}>
          <Button variant={"ghost"} className="gap-2">
            <IconChevronLeft />
            Voltar
          </Button>
        </Link>
        <Button
          form="upatePerfilForm"
          type="submit"
          className=" btn-primary text-white px-8"
        >
          Salvar
        </Button>
      </div>
      <UpdatePerfilForm perfil={perfil} />
    </div>
  );
}
