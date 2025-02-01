"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardLogin from "@/components/ui/custom/cards/cardLogin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleError, PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";
import { changePasswordByEmailToken } from "@/services";
import { ErrorResponse } from "@/types/Response";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { passwordRecoveryEmailSchema } from "./passwordRecoveryEmailSchema";

export default function PasswordRecoveryEmailForm({
  token,
}: {
  token: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof passwordRecoveryEmailSchema>>({
    resolver: zodResolver(passwordRecoveryEmailSchema),
    defaultValues: {
      senhaNova: "",
      senhaNovaConfirmacao: "",
    },
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

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

  async function onSubmit(data: z.infer<typeof passwordRecoveryEmailSchema>) {
    try {
      const response = await changePasswordByEmailToken(
        token,
        data.senhaNova,
        data.senhaNovaConfirmacao
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Passou aqui 2");
        toast.success("Senha alterada com sucesso!");
        router.push(PATH_PAGE_ACCOUNTS_LOGIN);
      } else {
        console.log("Passou aqui 3");
        const error = response.data as unknown as ErrorResponse;
        toast.error(error.message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <CardLogin>
        <CardHeader>
          <div className="w-full flex flex-col justify-center items-center gap-8">
            <CardTitle className="text-2xl">Digite sua nova senha</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-[68px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="senhaNova"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Senha</FormLabel>
                    <FormControl>
                      <div className="bg-black rounded-lg relative flex items-center">
                        <Input
                          className="bg-transparent pl-11 pr-12 flex-1 peer h-12"
                          {...field}
                          type={mostrarSenha ? "text" : "password"}
                        />
                        <IconLock className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
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
                    <FormLabel className="text-xl">Confirmar Senha</FormLabel>
                    <FormControl>
                      <div className="bg-black rounded-lg relative flex items-center">
                        <Input
                          className="bg-transparent pl-11 flex-1 peer h-12"
                          {...field}
                          type={mostrarSenha ? "text" : "password"}
                        />
                        <IconLock className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="my-6">
                <Button
                  type="submit"
                  className="w-full btn-primary text-white py-6 text-xl"
                >
                  Redefinir Senha
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </CardLogin>
    </div>
  );
}
