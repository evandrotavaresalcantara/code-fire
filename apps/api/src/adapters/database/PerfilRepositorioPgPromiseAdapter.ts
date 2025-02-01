import {
  Errors,
  Perfil,
  RepositorioPerfil,
  RepositorioPermissao,
} from "@packages/auth";
import { DatabaseConnection } from "./providers";
import { PerfilPermissoesSchema, PerfilSchema } from "./schemas";

export class RepositorioPerfilPgPromiseAdapter implements RepositorioPerfil {
  private conexao: DatabaseConnection;
  private tabelaPerfil = "perfil";
  private tabelaPerfilPermissoes = "perfil_permissoes";

  constructor(
    databaseConnection: DatabaseConnection,
    private permissaoRepositorio: RepositorioPermissao,
  ) {
    this.conexao = databaseConnection;
  }

  async obterPerfis(): Promise<Perfil[]> {
    const statement = `SELECT * FROM ${this.tabelaPerfil}`;
    const perfilsData = await this.conexao.query<PerfilSchema[]>(statement);
    if (perfilsData.length === 0) return [];
    const perfils = await Promise.all(
      perfilsData.map(async (perfilData) => {
        const perfil = new Perfil(perfilData);
        const statementPermissoes = `SELECT * FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
        const perfilPermissoesData = await this.conexao.query<
          PerfilPermissoesSchema[]
        >(statementPermissoes, [perfilData.id]);
        for (const perfilPermissao of perfilPermissoesData) {
          const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
            perfilPermissao.permissao_id,
          );
          if (permissao) perfil.adicionarPermissao(permissao);
        }
        return perfil;
      }),
    );
    return perfils;
  }

  async obterPerfilPorId(id: string): Promise<Perfil | undefined> {
    const statement = `SELECT * FROM ${this.tabelaPerfil} WHERE id = $1`;
    const [perfilData] = await this.conexao.query<PerfilSchema[]>(statement, [
      id,
    ]);
    if (!perfilData) return;
    const perfil = new Perfil(perfilData);
    const statementPermissoes = `SELECT * FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
    const perfilPermissoesData = await this.conexao.query<
      PerfilPermissoesSchema[]
    >(statementPermissoes, [id]);
    for (const perfilPermissao of perfilPermissoesData) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async obterPerfilPorPermissaoId(id: string): Promise<Perfil | undefined> {
    const statement = `
    SELECT p.* 
    FROM ${this.tabelaPerfil} p
    INNER JOIN ${this.tabelaPerfilPermissoes} pp ON pp.perfil_id = p.id
    WHERE pp.permissao_id = $1
  `;
    const [perfilData] = await this.conexao.query<PerfilSchema[]>(statement, [
      id,
    ]);
    if (!perfilData) return;
    const perfil = new Perfil(perfilData);
    const statementPermissoes = `SELECT * FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
    const perfilPermissoesData = await this.conexao.query<
      PerfilPermissoesSchema[]
    >(statementPermissoes, [perfilData.id]);
    for (const perfilPermissao of perfilPermissoesData) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async obterPerfilPorNome(nome: string): Promise<Perfil | undefined> {
    const statement = `SELECT * FROM ${this.tabelaPerfil} WHERE nome = $1`;
    const [perfilData] = await this.conexao.query<PerfilSchema[]>(statement, [
      nome.toLowerCase(),
    ]);
    if (!perfilData) return;
    const perfil = new Perfil(perfilData);
    const statementPermissoes = `SELECT * FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
    const perfilPermissoesData = await this.conexao.query<
      PerfilPermissoesSchema[]
    >(statementPermissoes, [perfilData.id]);
    for (const perfilPermissao of perfilPermissoesData) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async criarPerfil(perfil: Perfil): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaPerfil} (id, nome, descricao, data_criacao, ativo) VALUES ($1, $2, $3, $4, $5)`;
    await this.conexao.query(statement, [
      perfil.getUuid(),
      perfil.getNomePerfil(),
      perfil.getDescricaoPerfil(),
      perfil.getDataCriacao(),
      perfil.getativo(),
    ]);
    for (const permissao of perfil.obterPermissoes) {
      const statement = `INSERT INTO ${this.tabelaPerfilPermissoes} (perfil_id, permissao_id) VALUES ($1, $2)`;
      await this.conexao.query(statement, [
        perfil.getUuid(),
        permissao.getUuid(),
      ]);
    }
  }

  async editarPerfil(perfil: Perfil): Promise<void> {
    const statement = `UPDATE ${this.tabelaPerfil} SET nome = $1, descricao = $2, ativo = $3 WHERE id = $4 RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      perfil.getNomePerfil(),
      perfil.getDescricaoPerfil(),
      perfil.getativo(),
      perfil.getUuid(),
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.PERFIL_NAO_ENCONTRADO_ATUALIZACAO);
    }
    // Atualizar permissões do perfil
    const statementDeletarPermissoes = `DELETE FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
    await this.conexao.query(statementDeletarPermissoes, [perfil.getUuid()]);
    for (const permissao of perfil.obterPermissoes) {
      const statementInserirPermissoes = `INSERT INTO ${this.tabelaPerfilPermissoes} (perfil_id, permissao_id) VALUES ($1, $2)`;
      await this.conexao.query(statementInserirPermissoes, [
        perfil.getUuid(),
        permissao.getUuid(),
      ]);
    }
  }

  async excluirPerfil(id: string): Promise<void> {
    const statementPermissoes = `DELETE FROM ${this.tabelaPerfilPermissoes} WHERE perfil_id = $1`;
    await this.conexao.query(statementPermissoes, [id]);
    const statement = `DELETE FROM ${this.tabelaPerfil} WHERE id = $1 RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      id,
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.PERFIL_NAO_ENCONTRADO_EXCLUSAO);
    }
  }
}
