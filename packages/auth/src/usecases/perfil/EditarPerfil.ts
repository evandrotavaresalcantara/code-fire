import { CasoDeUso, EntidadeProps, Id } from "@packages/common";
import { RepositorioPerfil, RepositorioPermissao } from "../../provider";

type permissao = string;
interface Entrada extends EntidadeProps {
  nome?: string;
  descricao?: string;
  ativo?: boolean;
  permissoes?: permissao[];
}

export default class EditarPerfil implements CasoDeUso<Entrada, void> {
  constructor(
    private repoPerfil: RepositorioPerfil,
    private repoPermissao: RepositorioPermissao,
  ) {}
  async executar(entrada: Entrada): Promise<void> {
    const permissoes = entrada.permissoes || [];
    const idPerfil = new Id(entrada.id);

    const existePerfil = await this.repoPerfil.obterPerfilPorId(idPerfil.uuid);
    if (!existePerfil) throw new Error("perfil não existe.");

    const perfilAtualizado = existePerfil.clonar({ ...entrada });

    if (entrada.nome) {
      const existePerfilComEsseNome = await this.repoPerfil.obterPerfilPorNome(
        entrada.nome,
      );
      if (existePerfilComEsseNome)
        throw new Error("já existe perfil com esse nome.");
    }

    for (const permissao of permissoes) {
      const permissaoBD = await this.repoPermissao.obterPermissaoPorId(
        permissao,
      );
      if (permissaoBD) perfilAtualizado.adicionarPermissao(permissaoBD);
    }
    await this.repoPerfil.editarPerfil(perfilAtualizado);
  }
}
