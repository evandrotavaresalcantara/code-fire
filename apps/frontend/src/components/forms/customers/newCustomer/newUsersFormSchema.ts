import { z } from "zod";

export const NewUsersFormSchema = z
  .object({
    nome: z
      .string()
      .min(2, { message: "O nome precisa ter mais que 2 caracteres" })
      .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
        message: "O nome só pode conter letras",
      }),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z
      .string()
      .min(6, {
        message: "A senha deve ter no mínimo 6 caracteres",
      })
      .max(20, {
        message: "A senha deve ter no máximo 20 caracteres",
      })
      .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" })
      .regex(/[A-Z]/, {
        message: "A senha deve conter ao menos uma letra maiúscula",
      })
      .regex(/[a-z]/, {
        message: "A senha deve conter ao menos uma letra minúscula",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "A senha deve conter ao menos um caractere especial",
      }),
    senhaConfirmacao: z.string(),
    telefone: z
      .string()
      .regex(
        /^[1-9]{2}(?:9[0-9]{8}|[2-5][0-9]{7})$/,
        "Número de telefone inválido."
      )
      .optional(),
    ativo: z.boolean().default(true),
  })
  .refine(({ senha, senhaConfirmacao }) => senha === senhaConfirmacao, {
    message: "As senhas devem ser iguais",
    path: ["senhaConfirmacao"],
  });
