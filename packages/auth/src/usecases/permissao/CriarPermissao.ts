import { CasoDeUso, EntidadeProps, Nome } from "common";
import { RepositorioPermissao } from "../../provider";
import { Permissao } from "../../model";

interface Entrada extends EntidadeProps {
    nome?: string
    descricao?: string
    ativo?: boolean
}
export default class CriarPermissao implements CasoDeUso<Entrada, void> {
    constructor(private repo: RepositorioPermissao) { }

    async executar(entrada: Entrada): Promise<void> {
        const {id, ...permissao} = entrada
        const novaPermissao = new Permissao(permissao)

        const existePersmissaoComEsseNome = await this.repo.obterPermissaoPorNome(novaPermissao.getNomePermissao())
        if (existePersmissaoComEsseNome) throw new Error('nome da permissão já existe.')
        await this.repo.criarPermissao(novaPermissao)
    }
}