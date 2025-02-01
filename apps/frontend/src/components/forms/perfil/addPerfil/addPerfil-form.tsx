import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback } from "react";
import { usePerfilStore } from "@/hooks/store/perfisStore";
import { toast } from "sonner";
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
import { ADDPerfilFormSchema } from "./addPerfilFormSchema";
import CardModal from "@/components/ui/custom/cards/cardModal";

interface PerfilFormProps {
  onClose?: () => void;
}

export default function ADDPerfilForm({ onClose }: PerfilFormProps) {
  const { addPerfil } = usePerfilStore();

  const form = useForm<z.infer<typeof ADDPerfilFormSchema>>({
    resolver: zodResolver(ADDPerfilFormSchema),
    defaultValues: { nome: "", descricao: "" },
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

  async function onSubmit(data: z.infer<typeof ADDPerfilFormSchema>) {
    await addPerfil({ permissoes: [], ...data });
    const { error } = usePerfilStore.getState();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Perfil criado com Sucesso!");
      handlerModal();
    }
  }

  return (
    <CardModal title="Criar Perfil">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-6 ">
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
    </CardModal>
  );
}
