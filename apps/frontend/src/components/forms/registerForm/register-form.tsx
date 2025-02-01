"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardLogin from "@/components/ui/custom/cards/cardLogin";
import InputCustomPhone from "@/components/ui/custom/inputs/inputCustomPhone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleError, MsgSuccess, PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";
import { register } from "@/services";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconSignature,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerFormSchema } from "./registerFormSchema";

const BotaoCadastrar = React.memo(
  ({ isSubmitting }: { isSubmitting: boolean }) => (
    <Button
      type="submit"
      className="w-full btn-primary text-white py-6 text-xl"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" />
          Cadastrando...
        </>
      ) : (
        "Cadastre-se"
      )}
    </Button>
  )
);

BotaoCadastrar.displayName = "BotaoCadastrar";

export function RegisterForm() {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      senhaConfirmacao: "",
      telefone: "",
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

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    try {
      const response = await register(
        data.nome,
        data.email,
        data.senha,
        data.senhaConfirmacao,
        data.ativo,
        data.telefone
      );
      if (response.status === 201) {
        toast.success(MsgSuccess.USUARIO_CADASTRADO);
        push(PATH_PAGE_ACCOUNTS_LOGIN);
      } else {
        const error = response.data as ErrorResponse;
        toast.error(error.message);
      }
    } catch (error) {
      handleError(error);
    }
  }

  const LinkLogin = useMemo(
    () => (
      <Link
        href={PATH_PAGE_ACCOUNTS_LOGIN}
        className="text-green-500 hover:text-green-400"
      >
        Faça Login
      </Link>
    ),
    []
  );

  return (
    <CardLogin>
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-8">
          <CardTitle className="text-2xl">Cadastrar</CardTitle>
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
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Nome</FormLabel>
                  <FormControl>
                    <div className="bg-black rounded-lg relative flex items-center">
                      <Input
                        className="bg-transparent pl-11 flex-1 peer h-12"
                        {...field}
                      />
                      <IconSignature className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">E-mail</FormLabel>
                  <FormControl>
                    <div className="bg-black rounded-lg relative flex items-center">
                      <Input
                        className="bg-transparent pl-11 flex-1 peer h-12"
                        {...field}
                      />
                      <IconMail className="absolute left-3 text-zinc-600 peer-focus:text-zinc-300 pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
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
              name="senhaConfirmacao"
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
                      <IconLock className=" absolute left-3 text-zinc-600 peer-focus:text-zinc-300" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={() => (
                <FormItem>
                  <FormLabel className="text-xl">Telefone</FormLabel>
                  <FormControl>
                    <InputCustomPhone control={form.control} name="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-6">
              <BotaoCadastrar isSubmitting={form.formState.isSubmitting} />
            </div>
          </form>
        </Form>
        <div className=" text-center text-sm">
          <span>Já possui conta? {LinkLogin}</span>
          <br />
        </div>
      </CardContent>
    </CardLogin>
  );
}
