/* eslint-disable @typescript-eslint/no-explicit-any */
import { Usuario } from "@/types/Entities";
import { create } from "zustand";
import {
  addUser,
  findUsers,
  updateUser,
  deleteUser,
  register,
  passwordCustomerReplaceService,
} from "@/services";
import { updateUserPerfilService } from "@/services/users/updateUserPerfil";
import { passwordReplaceService } from "@/services/accounts/passwordReplace";
import { handleError } from "@/lib";
import { activateUser } from "@/services/users/activateUser";
import { disableUser } from "@/services/users/disableUser";

interface UsersState {
  users: Usuario[];
  isLoading: boolean;
  error: string | null;

  findUsers: () => Promise<void>;
  registerUser: (user: Omit<Usuario, "id">) => Promise<void>;
  addUser: (user: Omit<Usuario, "id">) => Promise<void>;
  updateUser: (user: Usuario) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  activateUser: (id: string) => Promise<void>;
  disbaleUser: (id: string) => Promise<void>;
  UpdateUserPerfil: (id: string, perfis: string[]) => Promise<void>;
  passwordReplace: (
    id: string,
    senhaNova: string,
    senhaNovaConfirmacao: string,
    senhaAntiga?: string
  ) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  findUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await findUsers();
      set({
        users: response.data.sort((a, b) => a.nome.localeCompare(b.nome)),
      });
    } catch (error: any) {
      set({
        error: error.message || "Erro ao buscar usuários",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  registerUser: async (user) => {
    set({ isLoading: true, error: null });
    try {
      await register(
        user.nome,
        user.email,
        user.senha!,
        user.senhaConfirmacao!,
        user.ativo!,
        user.telefone!
      );
    } catch (error: any) {
      handleError(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addUser: async (newUser) => {
    set({ isLoading: true, error: null });
    try {
      if (
        newUser.nome &&
        newUser.email &&
        newUser.senha &&
        newUser.senhaConfirmacao &&
        newUser.telefone
      ) {
        await addUser(
          newUser.nome,
          newUser.email,
          newUser.senha,
          newUser.senhaConfirmacao,
          newUser.telefone,
          newUser.ativo!
        );
      } else {
        throw new Error("Error desconhecido");
      }
      await get().findUsers();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao adicionar usuário",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (userEdit: any) => {
    set({ isLoading: true, error: null });
    try {
      await updateUser(userEdit);
      await get().findUsers();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao editar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  activateUser: async (id: any) => {
    set({ isLoading: true, error: null });
    try {
      await activateUser(id);
      await get().findUsers();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao editar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  disbaleUser: async (id: any) => {
    set({ isLoading: true, error: null });
    try {
      await disableUser(id);
      await get().findUsers();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao editar permissão",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  passwordReplace: async (id, senhaNova, senhaNovaConfirmacao, senhaAntiga) => {
    set({ isLoading: true, error: null });
    try {
      if (senhaAntiga) {
        await passwordReplaceService({
          id,
          senhaNova,
          senhaNovaConfirmacao,
          senhaAntiga,
        });
      } else {
        await passwordCustomerReplaceService({
          id,
          senhaNova,
          senhaNovaConfirmacao,
        });
      }
    } catch (error: any) {
      set({
        error: error.message || "Erro ao alterar senha de usuário",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  UpdateUserPerfil: async (id, perfis) => {
    set({ isLoading: true, error: null });
    try {
      await updateUserPerfilService(id, perfis);
    } catch (error: any) {
      set({
        error: error.message || "Erro ao adicionar perfil ao usuário",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id: any) => {
    set({ isLoading: true, error: null });
    try {
      await deleteUser(id);
      await get().findUsers();
    } catch (error: any) {
      set({
        error: error.message || "Erro ao deletar usuário",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
