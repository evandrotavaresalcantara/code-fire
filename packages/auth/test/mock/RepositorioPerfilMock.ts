import { Id } from "common";
import { Perfil, RepositorioPerfil } from "../../src";

export default class RepositorioPerfilMock implements RepositorioPerfil {
    constructor(private readonly perfis: Perfil[] = []) { }

    async obterPerfis(): Promise<Perfil[]> {
        return this.perfis
    }

    async obterPerfilPorId(id: Id): Promise<Perfil | null> {
        return this.perfis.find((p) => p.id.valor === id.valor) ?? null
    }

    async criarPerfil(perfil: Perfil): Promise<void> {
        this._salvar(perfil)
    }

    async editarPerfil(perfil: Perfil): Promise<void> {
        this._salvar(perfil)
    }
    async excluirPerfil(id: Id): Promise<void> {
        const index = this.perfis.findIndex((p) => p.id.valor === id.valor)
        if (index !== -1) {
            this.perfis.splice(index, 1)
        }
    }

    private _salvar(perfil: Perfil): void {
        const index = this.perfis.findIndex((p) => p.id.valor === p.id.valor)
        if (index >= 0) {
            this.perfis[index] = perfil
        } else {
            this.perfis.push(perfil)
        }
    }

}