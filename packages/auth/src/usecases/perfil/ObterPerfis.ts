import { CasoDeUso } from "common";
import { RepositorioPerfil } from "../../provider";
import { PermissaoDTO } from "../permissao/ObterPermissoes";
import { Permissao } from "../../model";

export interface PerfilDTO {
    id?: string
    nome?: string
    descricao?: string
    permissoes?: PermissaoDTO[]
}

export class ObterPerfis implements CasoDeUso<void, PerfilDTO[]> {
    constructor(private repositorioPerfil: RepositorioPerfil) { }

    async executar(): Promise<PerfilDTO[]> {
        const perfisBD = await this.repositorioPerfil.obterPerfis()

        return perfisBD.map((perfil) => ({
            id: perfil.getUuid(),
            nome: perfil.getNomePerfil(),
            descricao: perfil.getDescricaoPerfil(),
            permissoes: this.paraPermissaoDTO(perfil.obterPermissoes)
        }))
    }

    private paraPermissaoDTO(permissoes: Permissao[]): PermissaoDTO[] {
        return permissoes.map((permissao) => ({
            id: permissao.getUuid(),
            nome: permissao.getNomePermissao(),
            descricao: permissao.getDescricaoPermissao(),
        }))
    }
}