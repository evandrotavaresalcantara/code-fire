import { CasoDeUso } from "@packages/common";
import { RepositorioPerfil } from "../../provider";
import { PermissaoDTO } from "../permissao";
import Permissao from "../../model/Permissao";

interface Entrada {
  id: string;
}

interface Saida {
  id?: string;
  nome?: string;
  descricao?: string;
  permissoes?: PermissaoDTO[];
}
export class ObterPerfilPorId implements CasoDeUso<Entrada, Saida | null> {
  constructor(private readonly repo: RepositorioPerfil) {}

  async executar(entrada: Entrada): Promise<Saida | null> {
    const perfilBD = await this.repo.obterPerfilPorId(entrada.id);
    if (!perfilBD) return null;

    return {
      id: perfilBD.getUuid(),
      nome: perfilBD.getNomePerfil(),
      descricao: perfilBD.getDescricaoPerfil(),
      permissoes: this.paraPermissaoDTO(perfilBD.obterPermissoes),
    };
  }

  private paraPermissaoDTO(permissoes: Permissao[]): PermissaoDTO[] {
    return permissoes.map((permissao) => ({
      id: permissao.getUuid(),
      nome: permissao.getNomePermissao(),
      descricao: permissao.getDescricaoPermissao(),
    }));
  }
}
