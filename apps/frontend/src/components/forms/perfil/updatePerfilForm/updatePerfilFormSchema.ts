import { z } from "zod";

const permissaoSchema = z.object({
  id: z.string().min(1, "O ID da permissão é obrigatório."), 
  nome: z.string().min(1, "O nome da permissão é obrigatório."),
  descricao: z.string(), 
});

export const UpdatePerfilFormSchema = z.object({
  id: z.string(),
    nome: z.string().min(3, { message: "O nome precisa ter mais que 3 caracteres" })
    .max(20, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+$/, {
      message: "O nome deve ser uma palavra unica, contendo apenas letras",
    }),

    descricao: z.string().min(3, {message: "A descrição deve ter mais que 3 caracteres"}).max(50, { message: "A descrição não pode ter mais que 150 caracteres" }),
    permissoes: z.array(permissaoSchema).default([]),
})
