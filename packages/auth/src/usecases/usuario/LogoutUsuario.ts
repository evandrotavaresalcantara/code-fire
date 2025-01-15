import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";

type IdUsuario = string;

export default class LogoutUsuario implements CasoDeUso<IdUsuario, void> {
  constructor(private repo: RepositorioUsuario) {}

  async executar(idUsuario: IdUsuario): Promise<void> {
    const usuarioLogout = await this.repo.obterUsuarioPorId(idUsuario);
    if (!usuarioLogout) throw new Error("usuário não existe.");
    usuarioLogout.limparRefreshToken();
    await this.repo.editarUsuario(usuarioLogout);
  }
}
