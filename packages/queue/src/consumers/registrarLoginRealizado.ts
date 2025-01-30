import { LoginDAO, QueuesAuth, RegistrarLogin } from "@packages/auth/src";
import { Queue } from "@packages/queue/src";

export async function registrarLoginRealizado(
  queue: Queue,
  loginDAO: LoginDAO
) {
  const registrarLogin = new RegistrarLogin(loginDAO);
  await queue.consume<{
    userEmail: string;
    loginType: string;
    is2fa: boolean;
    loginDate: Date;
  }>(QueuesAuth.AUTH_LOGIN_REALIZADO, (data) => registrarLogin.executar(data));
}
