import { CasoDeUso } from "common";
import { RepositorioPermissao } from "../../provider";

export interface PermissaoDTO {
    id?: string
    nome?: string
    descricao?: string
}
export class ObterPermissoes implements CasoDeUso<void, PermissaoDTO[]> {
    constructor(private readonly repo: RepositorioPermissao) { }

    async executar(): Promise<PermissaoDTO[]> {
        const permissoesBD = await this.repo.obterPermissoes()
        return permissoesBD.map((p) => ({
            id: p.getUuid(),
            nome: p.getNomePermissao(),
            descricao: p.getDescricaoPermissao(),
        }))
    }
}