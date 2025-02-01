"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CardModal from "@/components/ui/custom/cards/cardModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePerfilStore } from "@/hooks/store/perfisStore";
import { usePermissionsStore } from "@/hooks/store/permissionsStore";
import { Perfil, Permissao } from "@/types/Entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UpdatePerfilFormSchema } from "../updatePerfilForm/updatePerfilFormSchema";

interface UpdatePerfilFormProps {
  perfil: Perfil;
}

export default function UpdatePerfilForm({ perfil }: UpdatePerfilFormProps) {
  const { updatePerfil } = usePerfilStore();
  const { permissions, findPermissions } = usePermissionsStore();

  const form = useForm<z.infer<typeof UpdatePerfilFormSchema>>({
    resolver: zodResolver(UpdatePerfilFormSchema),
    defaultValues: perfil,
  });

  const permissoesSelecionadas = form.watch("permissoes");

  async function onSubmit(data: z.infer<typeof UpdatePerfilFormSchema>) {
    await updatePerfil(data);
    const { error } = usePerfilStore.getState();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Perfil Editado com Sucesso!");
    }
  }

  useEffect(() => {
    findPermissions();
  }, []);

  function handleAddPermission(permissao: Permissao) {
    const currentPermissions = form.getValues("permissoes");
    if (!currentPermissions.some((p) => p.id === permissao.id)) {
      form.setValue("permissoes", [...currentPermissions, permissao]);
    }
  }

  function handleRemovePermission(permissao: Permissao) {
    const currentPermissions = form.getValues("permissoes");
    form.setValue(
      "permissoes",
      currentPermissions.filter((p) => p.id !== permissao.id)
    );
  }

  return (
    <Form {...form}>
      <form
        id="upatePerfilForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-4"
      >
        <Card className="mx-auto py-2 px-4 sm:px-16 bg-[#09090b] border-none text-white w-full">
          <div className="flex flex-col gap-6 pt-5 pb-11">
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
        </Card>
        <div className="flex w-full flex-col md:flex-row gap-4">
          <div className="flex flex-1">
            <CardModal title="Permissões Disponiveis">
              <div className="flex flex-wrap gap-2">
                {permissions.length === permissoesSelecionadas.length && (
                  <span>Nenhuma</span>
                )}
                {permissions
                  .filter(
                    (permissao) =>
                      !permissoesSelecionadas.some((p) => p.id === permissao.id)
                  )
                  .map((permissao) => (
                    <Badge
                      key={permissao.id}
                      className="select-none cursor-pointer"
                      onClick={() => handleAddPermission(permissao)}
                    >
                      {permissao.nome} +
                    </Badge>
                  ))}
              </div>
            </CardModal>
          </div>
          <div className="flex flex-1">
            <CardModal title="Permissões Selecionadas">
              <div className="flex flex-wrap gap-2 ">
                {permissoesSelecionadas.length === 0 && <span>Nenhuma</span>}
                {permissoesSelecionadas.map((permissao) => (
                  <Badge
                    key={permissao.id}
                    className="select-none cursor-pointer"
                    onClick={() => handleRemovePermission(permissao)}
                  >
                    {permissao.nome} -
                  </Badge>
                ))}
              </div>
            </CardModal>
          </div>
        </div>
      </form>
    </Form>
  );
}
