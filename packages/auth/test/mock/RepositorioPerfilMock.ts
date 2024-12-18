import { Id } from "common";
import { Perfil, RepositorioPerfil } from "../../src";

export default class RepositorioPerfilMock implements RepositorioPerfil {
    constructor(private readonly perfis: Perfil[] = []) { }

    async obterPerfilPorPermissaoId(id: string): Promise<Perfil | null> {
        return this.perfis.find((perfil) =>
            perfil.obterPermissoes.find((permissao) => permissao.getUuid() === id)
        ) ?? null
    }

    async obterPerfilPorNome(nome: string): Promise<Perfil | null> {
        return this.perfis.find((perfil) => perfil.getNomePerfil() === nome
        ) ?? null
    }

    async obterPerfis(): Promise<Perfil[]> {
        return this.perfis
    }

    async obterPerfilPorId(id: string): Promise<Perfil | null> {
        return this.perfis.find((p) => p.getUuid() === id) ?? null
    }

    async criarPerfil(perfil: Perfil): Promise<void> {
        this._salvar(perfil)
    }

    async editarPerfil(perfil: Perfil): Promise<void> {
        this._salvar(perfil)
    }
    async excluirPerfil(id: string): Promise<void> {
        const index = this.perfis.findIndex((p) => p.getUuid() === id)
        if (index !== -1) {
            this.perfis.splice(index, 1)
        }
    }

    private _salvar(perfil: Perfil): void {
        const index = this.perfis.findIndex((p) => p.getUuid() === p.getUuid())
        if (index >= 0) {
            this.perfis[index] = perfil
        } else {
            this.perfis.push(perfil)
        }
    }

}