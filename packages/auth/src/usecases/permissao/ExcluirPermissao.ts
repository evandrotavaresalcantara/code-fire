import { CasoDeUso, Id } from "common";
import { RepositorioPerfil, RepositorioPermissao } from "../../provider";

type IdPermissao = string

export default class ExcluirPermissao implements CasoDeUso<IdPermissao, void> {
    constructor(
        private repo: RepositorioPermissao,
        private repoPerfil: RepositorioPerfil
    ) { }

    async executar(idPermissao: IdPermissao): Promise<void> {

        const permissao = await this.repo.obterPermissaoPorId(idPermissao)
        if (!permissao) throw new Error("permissão não existe.")

        const existePerfilComEssaPermissao = await this.repoPerfil.obterPerfilPorPermissaoId(idPermissao)
        if (existePerfilComEssaPermissao) throw new Error('não é possível excluir a permissão. Existe perfil associado ela.')

        await this.repo.excluirPermissao(idPermissao)
    }
}