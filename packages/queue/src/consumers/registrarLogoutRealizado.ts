import { LogoutDAO, QueuesAuth, RegistrarLogout } from "@packages/auth/src";
import { Queue } from "@packages/queue/src";

export async function registrarLogoutRealizado(
  queue: Queue,
  logoutDAO: LogoutDAO
) {
  const registrarLogout = new RegistrarLogout(logoutDAO);
  await queue.consume<{
    userEmail: string;
    logoutDate: Date;
  }>(QueuesAuth.AUTH_LOGIN_REALIZADO, (data) => registrarLogout.executar(data));
}
