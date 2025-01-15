import { CasoDeUso, EntidadeProps, Id } from "@packages/common";
import { RepositorioPerfil, RepositorioUsuario } from "../../provider";

interface Entrada extends EntidadeProps {
  perfis?: string[];
}

export default class AtualizarPerfilUsuario
  implements CasoDeUso<Entrada, void>
{
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly repoPerfil: RepositorioPerfil,
  ) {}
  async executar(entrada: Entrada): Promise<void> {
    const perfis = entrada.perfis || [];
    const id = new Id(entrada.id);

    const usuario = await this.repo.obterUsuarioPorId(id.uuid);
    if (!usuario) throw new Error("usuário não existe.");

    usuario.limparPerfis();

    for (const perfil of perfis) {
      const perfilBD = await this.repoPerfil.obterPerfilPorId(perfil);
      if (perfilBD) usuario.adiconarPerfil(perfilBD);
    }
    await this.repo.editarUsuario(usuario);
  }
}
