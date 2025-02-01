import { Queue } from "@packages/queue";
import { QueuesAuth } from "../constants";
import { LogoutDAO } from "../provider";
import { RegistrarLogout } from "../usecases";

export async function registrarLogoutRealizado(
  queue: Queue,
  logoutDAO: LogoutDAO,
) {
  const registrarLogout = new RegistrarLogout(logoutDAO);
  await queue.consume<{
    userEmail: string;
    logoutDate: Date;
  }>(QueuesAuth.AUTH_LOGOUT_REALIZADO, (data) =>
    registrarLogout.executar(data),
  );
}
