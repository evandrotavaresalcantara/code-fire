import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
    obterPerfis(): Promise<Perfil[]>
    obterPerfilPorId(id: string): Promise<Perfil | null>
    obterPerfilPorPermissaoId(id: string): Promise<Perfil | null>
    obterPerfilPorNome(nome: string): Promise<Perfil | null>
    criarPerfil(perfil: Perfil): Promise<void>
    editarPerfil(perfil: Perfil): Promise<void>
    excluirPerfil(id: string): Promise<void>
}