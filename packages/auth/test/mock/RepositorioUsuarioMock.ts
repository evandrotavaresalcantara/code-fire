import { Id, Email } from "common";
import { RepositorioUsuario, Usuario } from "../../src";

export default class RepositorioUsuarioMock implements RepositorioUsuario {
    constructor(private readonly usuarios: Usuario[] = []) { }

    async obterUsuarioPorPerfilId(id: string): Promise<Usuario | null> {
        return this.usuarios.find((usuario) =>
            usuario.obterPerfis.find((perfil) => perfil.getUuid() === id)
        ) ?? null
    }

    async obterUsuarios(): Promise<Usuario[]> {
        return this.usuarios
    }

    async obterUsuarioPorId(id: string): Promise<Usuario | null> {
        return this.usuarios.find((u) => u.getUuid() === id) ?? null
    }

    async obterPorEmail(email: string): Promise<Usuario | null> {
        return this.usuarios.find((u) => u.getEmail() === email) ?? null
    }

    async criarUsuario(usuario: Usuario): Promise<void> {
        this._salvar(usuario)
    }

    async editarUsuario(usuario: Usuario): Promise<void> {
        this._salvar(usuario)
    }

    async excluirUsuario(id: string): Promise<void> {
        const index = this.usuarios.findIndex((u) => u.getUuid() === id)
        if (index !== -1) {
            this.usuarios.splice(index, 1)
        }
    }

    private _salvar(usuario: Usuario): void {
        const index = this.usuarios.findIndex((u) => u.getUuid() === usuario.getUuid())
        if (index >= 0) {
            this.usuarios[index] = usuario
        } else {
            this.usuarios.push(usuario)
        }
    }

}