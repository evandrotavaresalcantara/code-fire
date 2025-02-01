import { Errors, Permissao, RepositorioPermissao } from "@packages/auth";
import { DatabaseConnection } from "./providers";
import { PermissaoSchema } from "./schemas";

export class RepositorioPermissaoPgPromiseAdapter
  implements RepositorioPermissao
{
  private conexao: DatabaseConnection;
  private tabelaPermissao = "permissao";

  constructor(databaseConnection: DatabaseConnection) {
    this.conexao = databaseConnection;
  }

  async obterPermissoes(): Promise<Permissao[]> {
    const statement = `SELECT * FROM ${this.tabelaPermissao} ORDER BY nome ASC`;
    const permissoesData = await this.conexao.query<PermissaoSchema[]>(
      statement,
    );
    return permissoesData.map((permissao) => new Permissao(permissao));
  }

  async obterPermissaoPorId(id: string): Promise<Permissao | undefined> {
    const statement = `SELECT * FROM ${this.tabelaPermissao} WHERE id = $1`;
    const [permissao] = await this.conexao.query<PermissaoSchema[]>(statement, [
      id,
    ]);
    if (!permissao) return;
    return new Permissao(permissao);
  }

  async obterPermissaoPorNome(nome: string): Promise<Permissao | undefined> {
    const statement = `SELECT * FROM ${this.tabelaPermissao} WHERE nome = $1`;
    const [permissao] = await this.conexao.query<PermissaoSchema[]>(statement, [
      nome,
    ]);
    if (!permissao) return;
    return new Permissao(permissao);
  }

  async criarPermissao(permissao: Permissao): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaPermissao} (id, nome, descricao, data_criacao, ativo) VALUES ($1, $2, $3, $4, $5)`;
    await this.conexao.query(statement, [
      permissao.getUuid(),
      permissao.getNomePermissao(),
      permissao.getDescricaoPermissao(),
      permissao.getDataCriacao(),
      permissao.ativo,
    ]);
  }

  async editarPermissao(permissao: Permissao): Promise<void> {
    const statement = `UPDATE ${this.tabelaPermissao}
    SET nome = $1, descricao = $2, ativo = $3
    WHERE id = $4
    RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      permissao.getNomePermissao(),
      permissao.getDescricaoPermissao(),
      permissao.ativo,
      permissao.getUuid(),
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.PERMISSAO_NAO_ENCONTRADO_ATUALIZACAO);
    }
  }

  async excluirPermissao(id: string): Promise<void> {
    const statement = `DELETE FROM ${this.tabelaPermissao} WHERE id = $1 RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      id,
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.PERMISSAO_NAO_ENCONTRADO_EXCLUSAO);
    }
  }
}
