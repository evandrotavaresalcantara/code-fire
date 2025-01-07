import { CasoDeUso } from "@packages/common";
import { RepositorioPermissao } from "../../provider";
import { PermissaoDTO } from "./ObterPermissoes";

interface Entrada {
  id: string;
}

type Saida = PermissaoDTO;

export class ObterPermissaoPorId implements CasoDeUso<Entrada, Saida | null> {
  constructor(private readonly repo: RepositorioPermissao) {}

  async executar(entrada: Entrada): Promise<Saida | null> {
    const permissoesBD = await this.repo.obterPermissaoPorId(entrada.id);
    if (!permissoesBD) return null;

    return {
      id: permissoesBD.getUuid(),
      nome: permissoesBD.getNomePermissao(),
      descricao: permissoesBD.getDescricaoPermissao(),
    };
  }
}
