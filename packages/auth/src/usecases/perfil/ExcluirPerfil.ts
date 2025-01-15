import { CasoDeUso } from "@packages/common";
import { RepositorioPerfil, RepositorioUsuario } from "../../provider";

type Entrada = string;
export default class ExcluirPerfil implements CasoDeUso<Entrada, void> {
  constructor(
    private repo: RepositorioPerfil,
    private repoUsuario: RepositorioUsuario,
  ) {}

  async executar(entrada: string): Promise<void> {
    const existePerfil = await this.repo.obterPerfilPorId(entrada);
    if (!existePerfil) throw new Error("perfil não existe.");

    const existeUsuariosComEssePerfil =
      await this.repoUsuario.obterUsuarioPorPerfilId(entrada);
    if (existeUsuariosComEssePerfil)
      throw new Error(
        "não é possível excluir o perfil. Existe usuário associado a ele.",
      );

    await this.repo.excluirPerfil(entrada);
  }
}
