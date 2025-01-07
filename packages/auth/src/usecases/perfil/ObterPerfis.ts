import { CasoDeUso } from "@packages/common";
import { RepositorioPerfil } from "../../provider";
import { PermissaoDTO } from "../permissao/ObterPermissoes";

export interface PerfilDTO {
  id?: string;
  nome?: string;
  descricao?: string;
  permissoes?: PermissaoDTO[];
}

export class ObterPerfis implements CasoDeUso<void, PerfilDTO[]> {
  constructor(private repositorioPerfil: RepositorioPerfil) {}

  async executar(): Promise<PerfilDTO[]> {
    const perfisBD = await this.repositorioPerfil.obterPerfis();

    return perfisBD.map((perfil) => ({
      id: perfil.getUuid(),
      nome: perfil.getNomePerfil(),
      descricao: perfil.getDescricaoPerfil(),
      permissoes: [],
    }));
  }
}
