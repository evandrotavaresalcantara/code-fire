/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonSubmit from "@/components/ui/custom/buttons/buttonSubmit";
import ButtonCloseModal from "@/components/ui/custom/buttons/buttonCloseModal";
import { useCallback } from "react";
import CardModal from "@/components/ui/custom/cards/cardModal";
import { usePermissionsStore } from "@/hooks/store/permissionsStore";
import { toast } from "sonner";
import { findPermissionID } from "@/services";
import { PermissionsFormSchema } from "./PermissionsFormSchema";

interface PermissionsFormProps {
  onClose?: () => void;
  id?: string;
}

export default function PermissionsForm({ onClose, id }: PermissionsFormProps) {
  const { addPermission, isLoading, updatePermission } = usePermissionsStore();

  const form = useForm<z.infer<typeof PermissionsFormSchema>>({
    resolver: zodResolver(PermissionsFormSchema),
    defaultValues: async () => {
      if (!id) return { nome: "", descricao: "" };

      try {
        const permissao = await findPermissionID(id);
        return { nome: permissao.nome, descricao: permissao.descricao };
      } catch (error: any) {
        toast.error(error.message);
        return { nome: "", descricao: "" };
      }
    },
  });

  const resetForm = useCallback(() => {
    form.reset();
    form.clearErrors();
    handlerModal();
  }, []);

  function handlerModal() {
    if (onClose) {
      onClose();
    }
  }

  async function onSubmit(data: z.infer<typeof PermissionsFormSchema>) {
    if (id) {
      // Editar
      await updatePermission({ id, ...data });
      const { error } = usePermissionsStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Permissão atualizada com Sucesso!");
        handlerModal();
      }
    } else {
      // Criar
      await addPermission(data);
      const { error } = usePermissionsStore.getState();
      if (error) {
        toast.error(error);
      } else {
        toast.success("Permissão criada com Sucesso!");
        handlerModal();
      }
    }
  }

  return (
    <CardModal title={`${id ? "Editar" : "Criar"} Permissão`}>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loader" />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">Nome</FormLabel>
                      <FormControl>
                        <div className="bg-black rounded-lg relative flex items-center">
                          <Input
                            className="bg-transparent  flex-1 peer h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">Descrição</FormLabel>
                      <FormControl>
                        <div className="bg-black rounded-lg relative flex items-center">
                          <Input
                            className="bg-transparent  flex-1 peer h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center w-full gap-7">
                <ButtonCloseModal resetForm={resetForm} />
                <ButtonSubmit isSubmitting={form.formState.isSubmitting} />
              </div>
            </form>
          </Form>
        )}
    </CardModal>
  );
}
