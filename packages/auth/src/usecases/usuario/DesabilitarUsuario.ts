import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";

type IdUsuario = string;

export default class DesabilitarUsuario implements CasoDeUso<IdUsuario, void> {
  constructor(private repo: RepositorioUsuario) {}

  async executar(idUsuario: IdUsuario): Promise<void> {
    const usuarioExiste = await this.repo.obterUsuarioPorId(idUsuario);
    if (!usuarioExiste) throw new Error("usuário não existe.");
    const usuarioDesabilitado = usuarioExiste.clonar({ ativo: false });
    await this.repo.editarUsuario(usuarioDesabilitado);
  }
}
