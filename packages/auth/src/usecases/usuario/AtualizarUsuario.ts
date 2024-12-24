import { CasoDeUso, EntidadeProps, Id } from "common";
import { RepositorioUsuario } from "../../provider";

interface Entrada extends EntidadeProps {
  nomeCompleto?: string;
  celular?: string;
  urlPerfil?: string;
}

export default class AtualizarUsuario implements CasoDeUso<Entrada, void> {
  constructor(private readonly repo: RepositorioUsuario) {}
  async executar(entrada: Entrada): Promise<void> {
    const id = new Id(entrada.id);

    const usuario = await this.repo.obterUsuarioPorId(id.uuid);
    if (!usuario) throw new Error("usuário não existe.");

    const usuarioAtualizado = usuario.clonar({
      nomeCompleto: entrada.nomeCompleto,
      celular: entrada.celular,
      urlPerfil: entrada.urlPerfil,
    });
    await this.repo.editarUsuario(usuarioAtualizado);
  }
}
