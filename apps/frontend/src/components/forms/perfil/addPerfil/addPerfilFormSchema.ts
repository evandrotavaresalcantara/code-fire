import { z } from "zod";

export const ADDPerfilFormSchema = z.object({
    nome: z.string().min(3, { message: "O nome precisa ter mais que 3 caracteres" })
    .max(20, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+$/, {
      message: "O nome deve ser uma palavra unica, contendo apenas letras",
    }),

    descricao: z.string().min(3, {message: "A descrição deve ter mais que 3 caracteres"}).max(50, { message: "A descrição não pode ter mais que 150 caracteres" })
})