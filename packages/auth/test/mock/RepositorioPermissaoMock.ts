import { Permissao, RepositorioPermissao } from "../../src";

export class RepositorioPermissaoMock implements RepositorioPermissao {
  constructor(private readonly permissoes: Permissao[] = []) {}

  async obterPermissaoPorNome(nome: string): Promise<Permissao | undefined> {
    return this.permissoes.find(
      (permissao) => permissao.getNomePermissao() === nome,
    );
  }

  async obterPermissoes(): Promise<Permissao[]> {
    return this.permissoes;
  }

  async obterPermissaoPorId(id: string): Promise<Permissao | undefined> {
    return this.permissoes.find((p) => p.getUuid() === id);
  }

  async criarPermissao(permissao: Permissao): Promise<void> {
    this._salvar(permissao);
  }

  async editarPermissao(permissao: Permissao): Promise<void> {
    this._salvar(permissao);
  }

  async excluirPermissao(id: string): Promise<void> {
    const index = this.permissoes.findIndex((p) => p.getUuid() === id);
    if (index !== -1) {
      this.permissoes.splice(index, 1);
    }
  }

  private _salvar(permissao: Permissao): void {
    const index = this.permissoes.findIndex(
      (p) => p.getUuid() === permissao.getUuid(),
    );
    if (index >= 0) {
      this.permissoes[index] = permissao;
    } else {
      this.permissoes.push(permissao);
    }
  }
}
