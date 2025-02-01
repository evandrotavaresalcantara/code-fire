"use client";
import NewPasswordModal from "@/components/modals/newPasswordModal";
import ShowQrCodeLoginModal from "@/components/modals/showQrCOdeLoginModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import { usePerfilStore } from "@/hooks/store/perfisStore";
import { useUsersStore } from "@/hooks/store/userStore";
import { pegarIniciais } from "@/lib";
import { revalidateRoute } from "@/lib/actions/revalidade";
import { Perfil, Usuario } from "@/types/Entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMail, IconSignature } from "@tabler/icons-react";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UpdateCustomerFormSchema } from "./updateCustomerformSchema";

interface UpdateCustomerFormProps {
  customer: Usuario;
}

export default function UpdateCustomerForm({
  customer,
}: UpdateCustomerFormProps) {
  const { updateUser, UpdateUserPerfil, activateUser, disbaleUser } =
    useUsersStore();
  const { perfis, findPerfis } = usePerfilStore();

  const form = useForm<z.infer<typeof UpdateCustomerFormSchema>>({
    resolver: zodResolver(UpdateCustomerFormSchema),
    defaultValues: {
      ...customer,
      urlPerfil: customer.urlPerfil ?? undefined,
      telefone: customer.telefone ?? undefined,
    },
  });

  function houveAlteracao(original: Usuario, atual: Usuario) {
    return (
      JSON.stringify({ ...original, perfis: undefined }) !==
      JSON.stringify({ ...atual, perfis: undefined })
    );
  }

  async function onSubmit(data: z.infer<typeof UpdateCustomerFormSchema>) {
    if (houveAlteracao(customer, data)) {
      if (data.ativo) {
        activateUser(data.id);
      } else {
        disbaleUser(data.id);
      }
      await updateUser(data);
    }
    await UpdateUserPerfil(
      data.id,
      data.perfis.map((perfil) => perfil.id)
    );
    const { error } = useUsersStore.getState();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Usuário Editado com Sucesso!");
    }
    await revalidateRoute(`/manage/${customer.id}`);
  }

  // ver como isso vai ficar.
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        form.setValue("urlPerfil", base64);
        console.log(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveUrlPerfil = () => {
    form.setValue("urlPerfil", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    console.log(customer);
    findPerfis();
  }, []);

  return (
    <Form {...form}>
      <form
        id="upateCustomerForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-4"
      >
        <Card className="mx-auto py-2 px-4 sm:px-16 bg-[#09090b] border-none text-white w-full">
          <div className="flex flex-col lg:flex-row lg:gap-16 gap-6 py-4">
            <div className="flex flex-col pt-4 justify-between 2xl:min-w-[350px] gap-7">
              <FormField
                control={form.control}
                name="urlPerfil"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <div className="flex flex-grow justify-center relative group">
                          <label htmlFor="fileInput" className="cursor-pointer">
                            <Avatar className="size-40 2xl:size-52 group-hover:opacity-75 transition-opacity">
                              <AvatarImage
                                src={form.watch("urlPerfil") || undefined}
                                alt={form.watch("nome")}
                                className="object-cover"
                              />
                              <AvatarFallback className="flex items-center justify-center bg-zinc-800">
                                <span className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-l from-red-500 via-red-700 to-red-900">
                                  {pegarIniciais(form.watch("nome"))}
                                </span>
                              </AvatarFallback>
                            </Avatar>
                          </label>
                          <Input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="hidden"
                          />
                        </div>

                        {form.watch("urlPerfil") && (
                          <div className="absolute bottom-0 right-0 group">
                            <button
                              type="button"
                              onClick={handleRemoveUrlPerfil}
                              className="p-1 gap-1 bg-zinc-100 group-hover:bg-red-600 rounded-full text-black flex items-center transition-all duration-500 ease-in-out group-hover:pr-2"
                            >
                              <Trash className="w-4 h-4 group-hover:text-zinc-100" />
                              <span className="hidden group-hover:block text-xs text-zinc-100">
                                Remover
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4 justify-center">
                <div className="flex gap-4 justify-center">
                  <FormField
                    control={form.control}
                    name="sisAdmin"
                    render={({ field }) => (
                      <FormItem className="flex  flex-col p-2 rounded-lg flex-grow max-w-56 bg-zinc-900">
                        <div className="flex justify-between items-center w-full gap-2">
                          <FormLabel
                            className={clsx("text-sm", {
                              "text-zinc-500": !field.value,
                            })}
                          >
                            Admin
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ativo"
                    render={({ field }) => (
                      <FormItem className="flex  flex-col p-2 rounded-lg flex-grow max-w-56 bg-zinc-900 ">
                        <div className="flex justify-between items-center w-full gap-2">
                          <FormLabel
                            className={clsx("text-sm", {
                              "text-zinc-500": !field.value,
                            })}
                          >
                            Ativo
                          </FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="doisFatores"
                  render={({ field }) => (
                    <FormItem className="flex  flex-col p-2 rounded-lg flex-grow bg-zinc-900 ">
                      <div className="flex justify-between items-center w-full gap-2">
                        <FormLabel
                          className={clsx("text-sm", {
                            "text-zinc-500": !field.value,
                          })}
                        >
                          <p className="font-semibold">2AF </p>
                          <span
                            className={clsx("text-[10px]", {
                              "text-zinc-400": field.value,
                            })}
                          >
                            (Autenticação de 2 fatores)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4 justify-center">
                <NewPasswordModal userID={customer.id!} />
                <ShowQrCodeLoginModal email={form.getValues("email")} />
              </div>
            </div>
            <div className="flex flex-col flex-grow gap-4">
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
                name="telefone"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-xl">telefone</FormLabel>
                    <FormControl>
                      <InputCustomPhone
                        control={form.control}
                        name="telefone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="perfis"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow">
                    <FormLabel className="text-xl">Perfils</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2 bg-black p-4 items-center justify-center flex-grow">
                        {perfis.length === 0 && (
                          <p className="text-zinc-400 text-sm">
                            Sem perfis disponiveis.
                          </p>
                        )}
                        {perfis
                          .sort((a, b) => a.nome.localeCompare(b.nome))
                          .map((perfil) => (
                            <div
                              key={perfil.id}
                              className="flex items-center gap-2 bg-zinc-800 p-2 rounded-md transition-transform  active:scale-95"
                            >
                              <Checkbox
                                id={perfil.id}
                                checked={field.value?.some(
                                  (p: Perfil) => p.id === perfil.id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    const newValue = [
                                      ...(field.value || []),
                                      perfil,
                                    ];
                                    field.onChange(newValue);
                                  } else {
                                    const newValue = field.value?.filter(
                                      (p: Perfil) => p.id !== perfil.id
                                    );
                                    field.onChange(newValue);
                                  }
                                }}
                                className="w-5 h-5 cursor-default"
                              />
                              <label htmlFor={perfil.id} className="text-white">
                                {perfil.nome}
                              </label>
                            </div>
                          ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>
      </form>
    </Form>
  );
}
