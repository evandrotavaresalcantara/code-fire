import Permissao from "../model/Permissao";

export default interface RepositorioPermissao {
    obterPermissoes(): Promise<Permissao[]>
    obterPermissaoPorId(id: string): Promise<Permissao | null>
    obterPermissaoPorNome(nome: string): Promise<Permissao | null>
    criarPermissao(permissao: Permissao): Promise<void>
    editarPermissao(permissao: Permissao): Promise<void>
    excluirPermissao(id: string): Promise<void>
}