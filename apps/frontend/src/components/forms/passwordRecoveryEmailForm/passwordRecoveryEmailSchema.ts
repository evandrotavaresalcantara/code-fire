import { z } from "zod";

export const passwordRecoveryEmailSchema = z
    .object({
        senhaNova: z
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
        senhaNovaConfirmacao: z.string(),
    })
    .refine(({ senhaNova, senhaNovaConfirmacao }) => senhaNova === senhaNovaConfirmacao, {
        message: "As senhas devem ser iguais",
        path: ["senhaNovaConfirmacao"],
    });
