import { Id } from "common";
import { Permissao, RepositorioPermissao } from "../../src";

export class RepositorioPermissaoMock implements RepositorioPermissao{
    constructor(private readonly permissoes: Permissao[] = []){  }

    async obterPermissoes(): Promise<Permissao[]> {
        return  this.permissoes
    }

    async obterPermissaoPorId(id: Id): Promise<Permissao | null> {
       return this.permissoes.find((p) => p.id.valor === id.valor) ?? null
    }

    async criarPermissao(permissao: Permissao): Promise<void> {
        this._salvar(permissao)
    }

    async editarPermissao(permissao: Permissao): Promise<void> {
       this._salvar(permissao)
    }

    async excluirPermissao(id: Id): Promise<void> {
       const index = this.permissoes.findIndex((p) => p.id.valor === id.valor)
       if(index !== -1){
            this.permissoes.splice(index, 1)
       }
    }

    private _salvar(permissao: Permissao): void {
        const index = this.permissoes.findIndex((p) => p.id.valor === permissao.id.valor)
        if(index >=0){
            this.permissoes[index] = permissao
        }else{
            this.permissoes.push(permissao)
        }
    }
}