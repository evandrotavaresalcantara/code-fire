import { Id } from "common";
import Permissao from "../model/Permissao";

export default interface RepositorioPermissao {
    obterPermissoes(): Promise<Permissao[]>
    obterPermissaoPorId(id: Id): Promise<Permissao | null>
    criarPermissao(permissao: Permissao): Promise<void>
    editarPermissao(permissao: Permissao): Promise<void>
    excluirPermissao(id: Id): Promise<void>
}