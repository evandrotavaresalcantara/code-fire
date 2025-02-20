import { CasoDeUso, EntidadeProps, Id } from "@packages/common";
import { RepositorioUsuario } from "../../provider";

interface Entrada extends EntidadeProps {
  nomeCompleto?: string;
  telefone?: string;
  urlPerfil?: string;
  email?: string;
  autenticacaoDoisFatores?: boolean;
  sisAdmin?: boolean;
}

export default class AtualizarUsuario implements CasoDeUso<Entrada, void> {
  constructor(private readonly repo: RepositorioUsuario) {}
  async executar(entrada: Entrada): Promise<void> {
    const id = new Id(entrada.id);

    const usuario = await this.repo.obterUsuarioPorId(id.uuid);
    if (!usuario) throw new Error("usuário não existe.");

    if (entrada.email) {
      const existeEmail = await this.repo.obterPorEmail(entrada.email);
      if (existeEmail && existeEmail.getUuid() !== usuario.getUuid())
        throw new Error("email já existe.");
    }
    // let urlBucket = undefined;
    // if (entrada.urlPerfil) {
    //   urlBucket = (await this.bucket.saveImage(entrada.urlPerfil)) as {
    //     url: string;
    //   };
    // }
    const usuarioAtualizado = usuario.clonar({
      nomeCompleto: entrada.nomeCompleto,
      telefone: entrada.telefone,
      urlPerfil: entrada.urlPerfil,
      autenticacaoDoisFatores: entrada.autenticacaoDoisFatores,
      sisAdmin: entrada.sisAdmin,
      ...(entrada.email !== undefined && { email: entrada.email }),
    });
    await this.repo.editarUsuario(usuarioAtualizado);
  }
}
