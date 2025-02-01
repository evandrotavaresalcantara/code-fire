import { EnviarEmail, ServidorEmail } from "@packages/email";
import { Queue } from "@packages/queue";
import { QueuesAuth } from "../constants";

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
