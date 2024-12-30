import { CasoDeUso, EntidadeProps, Id } from "@packages/common";
import { RepositorioPermissao } from "../../provider";

interface Entrada extends EntidadeProps {
  nome?: string;
  descricao?: string;
  ativo?: boolean;
}
export default class EditarPermissao implements CasoDeUso<Entrada, void> {
  constructor(private repo: RepositorioPermissao) {}

  async executar(entrada: Entrada): Promise<void> {
    const idPermissao = new Id(entrada.id);

    const existePermissao = await this.repo.obterPermissaoPorId(
      idPermissao.uuid,
    );
    if (!existePermissao) throw new Error("permissão não existe.");

    if (entrada.nome) {
      const existePermissaoComEsseNome = await this.repo.obterPermissaoPorNome(
        entrada.nome,
      );
      if (
        existePermissaoComEsseNome &&
        existePermissaoComEsseNome.getUuid() !== idPermissao.uuid
      )
        throw new Error("nome da permissão já existe.");
    }
    const permissaoAtualizada = existePermissao.clonar({ ...entrada });

    await this.repo.editarPermissao(permissaoAtualizada);
  }
}
