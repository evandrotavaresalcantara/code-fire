import { Queue } from "@packages/queue";
import { QueuesAuth } from "../constants";
import { LoginDAO } from "../provider";
import { RegistrarLogin } from "../usecases";

export async function registrarLoginRealizado(
  queue: Queue,
  loginDAO: LoginDAO,
) {
  const registrarLogin = new RegistrarLogin(loginDAO);
  await queue.consume<{
    userEmail: string;
    loginType: string;
    is2fa: boolean;
    loginDate: Date;
  }>(QueuesAuth.AUTH_LOGIN_REALIZADO, (data) => registrarLogin.executar(data));
}
