import { useUsersStore } from "@/hooks/store/userStore";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordCustomerReplaceFormSchema } from "./passwordCustomerReplaceFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";


export default function PasswordCustomerReplaceForm({ userID, onClose }: { userID: string, onClose?: () => void }) {
    const { passwordReplace } = useUsersStore();
    const [mostrarSenha, setMostrarSenha] = useState(false);
  
    const form = useForm<z.infer<typeof passwordCustomerReplaceFormSchema>>({
      resolver: zodResolver(passwordCustomerReplaceFormSchema),
      defaultValues: {
        senhaNova: "",
        senhaNovaConfirmacao: "",
      },
    });
  
    async function onSubmit(data: z.infer<typeof passwordCustomerReplaceFormSchema>) {
      await passwordReplace(
        userID,
        data.senhaNova,
        data.senhaNovaConfirmacao
      );
  
      const { error } = useUsersStore.getState();
      if (error) {
        toast.error(error);
      } else {
        resetForm();
        toast.success("Senha alterada com Sucesso!");
        if (onClose) {
          onClose();
        }
      }
    }
  
    const resetForm = useCallback(() => {
      form.reset();
      form.clearErrors();
    }, []);
  
    const handlerMostrarSenha = useCallback(() => {
      setMostrarSenha((prev) => !prev);
    }, []);
  
    const handlerIconMostrarSenha = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        handlerMostrarSenha();
      },
      [handlerMostrarSenha]
    );
  
    return (
      <div className="flex flex-col gap-5">
        <Form {...form}>
          <FormField
            control={form.control}
            name="senhaNova"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Nova senha</FormLabel>
                <FormControl>
                  <div className="bg-black rounded-lg relative flex items-center">
                    <Input
                      className="bg-transparent pl-11 flex-1 peer h-12"
                      {...field}
                      type={mostrarSenha ? "text" : "password"}
                    />
                    <IconLock className=" absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
                    {mostrarSenha ? (
                    <IconEyeOff
                      onMouseDown={handlerIconMostrarSenha}
                      className="absolute right-3 text-zinc-600 hover:text-zinc-300"
                    />
                  ) : (
                    <IconEye
                      onMouseDown={handlerIconMostrarSenha}
                      className="absolute right-3 text-zinc-600 hover:text-zinc-300"
                    />
                  )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="senhaNovaConfirmacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Confirmar nova senha</FormLabel>
                <FormControl>
                  <div className="bg-black rounded-lg relative flex items-center">
                    <Input
                      className="bg-transparent pl-11 flex-1 peer h-12"
                      {...field}
                      type={mostrarSenha ? "text" : "password"}
                    />
                    <IconLock className=" absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-grow justify-end">
          <Button
            type="button"
            className="bg-gradient-to-r from-green-900 via-green-700 to-green-600 text-white"
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Atualizando...
              </>
            ) : (
              "Atualizar"
            )}
          </Button>
          </div>
        </Form>
      </div>
    );
  }
  