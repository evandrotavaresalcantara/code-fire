import {
  Errors,
  RepositorioPerfil,
  RepositorioUsuario,
  Usuario,
} from "@packages/auth";
import { DatabaseConnection } from "./providers";
import { UsuarioPerfilsSchema, UsuarioSchema } from "./schemas";

export class RepositorioUsuarioPgPromiseAdapter implements RepositorioUsuario {
  private conexao: DatabaseConnection;
  private tabelaPerfil = "perfil";
  private tabelaUsuarioPerfils = "usuario_perfils";
  private tabelaUsuario = "usuario";
  private tabelaOtp = "otp";
  private tabelaQrCodeLogin = "qr_code_login";

  constructor(
    databaseConnection: DatabaseConnection,
    private perfilRepositorio: RepositorioPerfil,
  ) {
    this.conexao = databaseConnection;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    const statement = `SELECT * FROM ${this.tabelaUsuario}`;
    const usuariosData = await this.conexao.query<UsuarioSchema[]>(statement);
    if (usuariosData.length === 0) return [];
    const usuarios = await Promise.all(
      usuariosData.map(async (usuarioData) => {
        const usuario = new Usuario({
          id: usuarioData.id,
          nomeCompleto: usuarioData.nome,
          email: usuarioData.email,
          senha: usuarioData.senha,
          telefone: usuarioData.telefone,
          urlPerfil: usuarioData.imagem_perfil,
          ativo: usuarioData.ativo,
          tokenRecuperacaoSenha: usuarioData.recuperar_senha_token,
          dataExpiracaoTokenRecuperacaoSenha:
            usuarioData.data_expiraca_recuperar_senha_token,
          tokenRefreshToken: usuarioData.refresh_token,
          dataExpiracaoTokenRefreshToken:
            usuarioData.data_expiracao_refresh_token,
          autenticacaoDoisFatores: usuarioData.dois_fatores,
          dataCriacao: usuarioData.data_criacao,
          sisAdmin: usuarioData.sis_admin,
        });
        const statementPerfils = `SELECT * FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
        const usuarioPerfilssData = await this.conexao.query<
          UsuarioPerfilsSchema[]
        >(statementPerfils, [usuarioData.id]);
        for (const usuarioPerfil of usuarioPerfilssData) {
          const perfil = await this.perfilRepositorio.obterPerfilPorId(
            usuarioPerfil.perfil_id,
          );
          if (perfil) usuario.adiconarPerfil(perfil);
        }
        return usuario;
      }),
    );
    return usuarios;
  }

  async obterUsuarioPorId(id: string): Promise<Usuario | undefined> {
    const statement = `SELECT * FROM ${this.tabelaUsuario} WHERE id = $1`;
    const [usuarioData] = await this.conexao.query<UsuarioSchema[]>(statement, [
      id,
    ]);
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      telefone: usuarioData.telefone,
      urlPerfil: usuarioData.imagem_perfil,
      ativo: usuarioData.ativo,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token,
      tokenRefreshToken: usuarioData.refresh_token,
      dataExpiracaoTokenRefreshToken: usuarioData.data_expiracao_refresh_token,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      sisAdmin: usuarioData.sis_admin,
    });
    const statementPerfils = `SELECT * FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    const usuarioPerfilsData = await this.conexao.query<UsuarioPerfilsSchema[]>(
      statementPerfils,
      [id],
    );
    for (const usuarioPerfil of usuarioPerfilsData) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async obterUsuarioPorTokenRedefinicaoSenha(
    token: string,
  ): Promise<Usuario | undefined> {
    const statement = `SELECT * FROM ${this.tabelaUsuario} WHERE recuperar_senha_token = $1`;
    const [usuarioData] = await this.conexao.query<UsuarioSchema[]>(statement, [
      token,
    ]);
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      telefone: usuarioData.telefone,
      urlPerfil: usuarioData.imagem_perfil,
      ativo: usuarioData.ativo,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token,
      tokenRefreshToken: usuarioData.refresh_token,
      dataExpiracaoTokenRefreshToken: usuarioData.data_expiracao_refresh_token,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      sisAdmin: usuarioData.sis_admin,
    });
    const statementPerfils = `SELECT * FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    const usuarioPerfilsData = await this.conexao.query<UsuarioPerfilsSchema[]>(
      statementPerfils,
      [usuarioData.id],
    );
    for (const usuarioPerfil of usuarioPerfilsData) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async obterUsuarioPorPerfilId(id: string): Promise<Usuario | undefined> {
    const statement = `
       SELECT p.* 
       FROM ${this.tabelaUsuario} p
       INNER JOIN ${this.tabelaUsuarioPerfils} pp ON pp.usuario_id = p.id
       WHERE pp.perfil_id = $1
     `;
    const [usuarioData] = await this.conexao.query<UsuarioSchema[]>(statement, [
      id,
    ]);
    if (!usuarioData) return;
    const usuario = new Usuario(usuarioData);
    const statementPerfis = `SELECT * FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    const usuarioPerfisData = await this.conexao.query<UsuarioPerfilsSchema[]>(
      statementPerfis,
      [usuarioData.id],
    );
    for (const usuarioPerfil of usuarioPerfisData) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async obterPorEmail(email: string): Promise<Usuario | undefined> {
    const statement = `SELECT * FROM ${this.tabelaUsuario} WHERE email = $1`;
    const [usuarioData] = await this.conexao.query<UsuarioSchema[]>(statement, [
      email,
    ]);
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      telefone: usuarioData.telefone,
      urlPerfil: usuarioData.imagem_perfil,
      ativo: usuarioData.ativo,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token,
      tokenRefreshToken: usuarioData.refresh_token,
      dataExpiracaoTokenRefreshToken: usuarioData.data_expiracao_refresh_token,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      sisAdmin: usuarioData.sis_admin,
    });
    const statementPerfils = `SELECT * FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    const usuarioPerfilsData = await this.conexao.query<UsuarioPerfilsSchema[]>(
      statementPerfils,
      [usuarioData.id],
    );
    for (const usuarioPerfil of usuarioPerfilsData) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async criarUsuario(usuario: Usuario): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaUsuario} (id, nome, email, senha, data_criacao, ativo, refresh_token, data_expiracao_refresh_token, recuperar_senha_token, data_expiraca_recuperar_senha_token, dois_fatores, telefone, imagem_perfil) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    await this.conexao.query(statement, [
      usuario.getUuid(),
      usuario.getNome(),
      usuario.getEmail(),
      usuario.getSenha(),
      usuario.getDataCriacao(),
      usuario.habilitado,
      usuario.getTokenReFreshToken(),
      usuario.getDataExpiracaoTokenFreshToken(),
      usuario.getTokenRecuperacaoSenha(),
      usuario.getDataExpiracaoRecuperacaoSenha(),
      usuario.getAutenticacaoDoisFatores(),
      usuario.getTelefone(),
      usuario.getUrlPerfil(),
      usuario.getSisAdmin(),
      usuario.getSisAdmin(),
    ]);
    for (const perfil of usuario.obterPerfis) {
      const statement = `INSERT INTO ${this.tabelaUsuarioPerfils} (perfil_id, usuario_id) VALUES ($1, $2)`;
      await this.conexao.query(statement, [
        perfil.getUuid(),
        usuario.getUuid(),
      ]);
    }
  }

  async editarUsuario(usuario: Usuario): Promise<void> {
    const statement = `UPDATE ${this.tabelaUsuario} SET nome = $1, email = $2, senha = $3, ativo = $4, refresh_token = $5, data_expiracao_refresh_token = $6, recuperar_senha_token = $7, data_expiraca_recuperar_senha_token = $8, dois_fatores = $9, telefone = $10, imagem_perfil = $11 WHERE id = $12 RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      usuario.getNome(),
      usuario.getEmail(),
      usuario.getSenha(),
      usuario.habilitado,
      usuario.getTokenReFreshToken(),
      usuario.getDataExpiracaoTokenFreshToken(),
      usuario.getTokenRecuperacaoSenha(),
      usuario.getDataExpiracaoRecuperacaoSenha(),
      usuario.getAutenticacaoDoisFatores(),
      usuario.getTelefone(),
      usuario.getUrlPerfil(),
      usuario.getUuid(),
      usuario.getSisAdmin(),
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.PERFIL_NAO_ENCONTRADO_ATUALIZACAO);
    }
    // Atualizar perfils do usuario
    const statementDeletarPerfils = `DELETE FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    await this.conexao.query(statementDeletarPerfils, [usuario.getUuid()]);
    for (const perfil of usuario.obterPerfis) {
      const statementInserirPerfils = `INSERT INTO ${this.tabelaUsuarioPerfils} (perfil_id, usuario_id) VALUES ($1, $2)`;
      await this.conexao.query(statementInserirPerfils, [
        perfil.getUuid(),
        usuario.getUuid(),
      ]);
    }
  }

  async excluirUsuario(id: string): Promise<void> {
    const [user] = await this.conexao.query<{ email: string }[]>(
      `SELECT email FROM ${this.tabelaUsuario} WHERE id = $1`,
      [id],
    );
    const statementPerfils = `DELETE FROM ${this.tabelaUsuarioPerfils} WHERE usuario_id = $1`;
    await this.conexao.query(statementPerfils, [id]);
    const statement = `DELETE FROM ${this.tabelaUsuario} WHERE id = $1 RETURNING id`;
    const resultado = await this.conexao.query<{ id: string }[]>(statement, [
      id,
    ]);
    if (resultado.length === 0) {
      throw new Error(Errors.USUARIO_NAO_ENCONTRADO_EXCLUSAO);
    }
    const statementOtp = `DELETE FROM ${this.tabelaOtp} WHERE email = $1`;
    await this.conexao.query(statementOtp, [user.email]);
    const statementQrCode = `DELETE FROM ${this.tabelaQrCodeLogin} WHERE email = $1`;
    await this.conexao.query(statementQrCode, [user.email]);
  }
}
