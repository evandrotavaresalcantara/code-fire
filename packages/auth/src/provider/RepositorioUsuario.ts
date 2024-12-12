import { Email, Id } from "common";
import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
    obterUsuarios(): Promise<Usuario[]>
    obterUsuarioPorId(id: Id): Promise<Usuario | null>
    obterPorEmail(email: Email): Promise<Usuario | null>
    criarUsuario(usuario: Usuario): Promise<void>
    editarUsuario(usuario: Usuario): Promise<void>
    excluirUsuario(id: Id): Promise<void>
}