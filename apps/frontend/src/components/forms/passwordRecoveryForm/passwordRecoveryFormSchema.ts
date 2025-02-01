import { z } from "zod";

export const passwordRecoveryFormShema = z.object({
    email: z.string().email({ message: "Formato de Email inválido" }),
})