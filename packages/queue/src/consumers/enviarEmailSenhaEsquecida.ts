import { QueuesAuth } from "@packages/auth/src";
import { EnviarEmail, ServidorEmail } from "@packages/email/src";
import { Queue } from "@packages/queue/src";

export async function enviarEmailSenhaEsquecida(
  queue: Queue,
  servidorEmail: ServidorEmail
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
