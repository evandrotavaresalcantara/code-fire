import { z } from "zod";
import { UpdatePerfilFormSchema } from "../../perfil/updatePerfilForm/updatePerfilFormSchema";

export const UpdateCustomerFormSchema = z.object({
  id: z.string(),
  nome: z
    .string()
    .min(2, { message: "O nome precisa ter mais que 2 caracteres" })
    .max(150, { message: "O nome não pode ter mais que 150 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "O nome só pode conter letras",
    }),

  email: z.string().email({ message: "E-mail inválido" }),

  ativo: z.boolean(),
  
  perfis: z.array(UpdatePerfilFormSchema),

  sisAdmin: z.boolean().default(false),
  
  doisFatores: z.boolean().default(false),

  urlPerfil: z.string().url().optional(),

  telefone: z
      .string()
      .regex(
        /^[1-9]{2}(?:9[0-9]{8}|[2-5][0-9]{7})$/,
        "Número de telefone inválido."
      ).optional(),
});
