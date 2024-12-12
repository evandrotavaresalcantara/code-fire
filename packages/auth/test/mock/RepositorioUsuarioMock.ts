import { Id, Email } from "common";
import { RepositorioUsuario, Usuario } from "../../src";

export default class RepositorioUsuarioMock implements RepositorioUsuario {
    constructor(private readonly usuarios: Usuario[] = []) { }

    async obterUsuarios(): Promise<Usuario[]> {
        return this.usuarios
    }

    async obterUsuarioPorId(id: Id): Promise<Usuario | null> {
        return this.usuarios.find((u) => u.id.valor === id.valor) ?? null
    }

    async obterPorEmail(email: Email): Promise<Usuario | null> {
        return this.usuarios.find((u) => email.valor === email.valor) ?? null
    }

    async criarUsuario(usuario: Usuario): Promise<void> {
        this._salvar(usuario)
    }

    async editarUsuario(usuario: Usuario): Promise<void> {
        this._salvar(usuario)
    }
    
    async excluirUsuario(id: Id): Promise<void> {
        const index = this.usuarios.findIndex((u) => u.id.valor === id.valor)
        if (index !== -1) {
            this.usuarios.splice(index, 1)
        }
    }

    private _salvar(usuario: Usuario): void {
        const index = this.usuarios.findIndex((u) => u.id.valor === usuario.id.valor)
        if (index >= 0) {
            this.usuarios[index] = usuario
        } else {
            this.usuarios.push(usuario)
        }
    }

}