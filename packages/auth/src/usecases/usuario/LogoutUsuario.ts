import { CasoDeUso } from "@packages/common";
import { Queue } from "@packages/queue";
import { QueuesAuth } from "../../constants";
import { RepositorioUsuario } from "../../provider";

type IdUsuario = string;

export default class LogoutUsuario implements CasoDeUso<IdUsuario, void> {
  constructor(private repo: RepositorioUsuario, readonly queue: Queue) {}

  async executar(idUsuario: IdUsuario): Promise<void> {
    const usuarioLogout = await this.repo.obterUsuarioPorId(idUsuario);
    if (!usuarioLogout) throw new Error("usuário não existe.");
    usuarioLogout.limparRefreshToken();
    await this.repo.editarUsuario(usuarioLogout);
    const msg = {
      userEmail: usuarioLogout.getEmail(),
      logoutDate: new Date(),
    };
    this.queue.publish<{
      userEmail: string;
      logoutDate: Date;
    }>(QueuesAuth.AUTH_LOGOUT_REALIZADO, msg);
  }
}
