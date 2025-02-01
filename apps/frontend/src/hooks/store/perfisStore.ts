/* eslint-disable @typescript-eslint/no-explicit-any */
import { addPerfil } from "@/services/perfis/addPerfil";
import { deletePerfil } from "@/services/perfis/deletePerfil";
import { findPerfis } from "@/services/perfis/findPerfis";
import { updatePerfil } from "@/services/perfis/updatePerfil";
import { Perfil } from "@/types/Entities";
import { create } from "zustand";

interface PerfisState {
  perfis: Perfil[];
  isLoading: boolean;
  error: string | null;

  findPerfis: () => Promise<void>;
  addPerfil: (perfil: Omit<Perfil, "id">) => Promise<void>;
  updatePerfil: (perfil: Perfil) => Promise<void>;
  deletePerfil: (id: string) => Promise<void>;
}

export const usePerfilStore = create<PerfisState>((set, get) => ({
  perfis: [],
  isLoading: false,
  error: null,

  findPerfis: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await findPerfis();
      set({ perfis: response.data });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar permissões",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  addPerfil: async (newPerfil) => {
    set({ isLoading: true, error: null });
    try {
      await addPerfil(newPerfil.nome, newPerfil.descricao);
      await get().findPerfis();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao adicionar perfil",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updatePerfil: async (perfilEdit) => {
    set({ isLoading: true, error: null });
    try {
      await updatePerfil(perfilEdit);
      await get().findPerfis();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao editar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deletePerfil: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deletePerfil(id);
      await get().findPerfis();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao deletar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
