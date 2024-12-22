import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
    obterUsuarios(): Promise<Usuario[]>
    obterUsuarioPorId(id: string): Promise<Usuario | null>
    obterUsuarioPorPerfilId(id: string): Promise<Usuario | null>
    obterPorEmail(email: string): Promise<Usuario | null>
    criarUsuario(usuario: Usuario): Promise<void>
    editarUsuario(usuario: Usuario): Promise<void>
    excluirUsuario(id: string): Promise<void>
}