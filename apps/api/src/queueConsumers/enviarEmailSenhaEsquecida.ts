import { EnviarEmail } from "@/services";
import { QueuesAuth } from "@packages/auth/src";
import { Queue, ServidorEmail } from "common";

export async function enviarEmailSenhaEsquecida(
  queue: Queue,
  servidorEmail: ServidorEmail,
) {
  const enviarEmail = new EnviarEmail(servidorEmail);
  await queue.consume<{
    de: string;
    para: string;
    assunto: string;
    corpo: string;
    isHtml?: boolean;
    isTest?: boolean;
  }>(QueuesAuth.AUTH_SENHA_ESQUECIDA, (data) => enviarEmail.executar(data));
}
