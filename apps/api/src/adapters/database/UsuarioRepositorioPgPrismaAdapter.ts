import {
  Errors,
  RepositorioPerfil,
  RepositorioUsuario,
  Usuario,
} from "@packages/auth";
import { PrismaClient } from "@prisma/client";

export default class RepositorioUsuarioPrismaPg implements RepositorioUsuario {
  private readonly prisma: PrismaClient;

  constructor(
    conexaoPrisma: PrismaClient,
    private perfilRepositorio: RepositorioPerfil,
  ) {
    this.prisma = conexaoPrisma;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    const usuariosData = await this.prisma.usuario.findMany({
      include: { usuario_perfils: true },
    });
    if (usuariosData.length === 0) return [];

    const usuarios = await Promise.all(
      usuariosData.map(async (usuarioData) => {
        const usuario = new Usuario({
          id: usuarioData.id,
          nomeCompleto: usuarioData.nome,
          email: usuarioData.email,
          senha: usuarioData.senha,
          telefone: usuarioData.telefone ?? undefined,
          urlPerfil: usuarioData.imagem_perfil ?? undefined,
          ativo: usuarioData.ativo,
          tokenRecuperacaoSenha: usuarioData.recuperar_senha_token ?? undefined,
          dataExpiracaoTokenRecuperacaoSenha:
            usuarioData.data_expiraca_recuperar_senha_token ?? undefined,
          tokenRefreshToken: usuarioData.refresh_token ?? undefined,
          dataExpiracaoTokenRefreshToken:
            usuarioData.data_expiracao_refresh_token ?? undefined,
          autenticacaoDoisFatores: usuarioData.dois_fatores,
          dataCriacao: usuarioData.data_criacao,
          sisAdmin: usuarioData.sis_admin,
        });

        for (const usuarioPerfil of usuarioData.usuario_perfils) {
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
    const usuarioData = await this.prisma.usuario.findUnique({
      include: { usuario_perfils: true },
      where: {
        id: id,
      },
    });
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      ativo: usuarioData.ativo,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      urlPerfil: usuarioData.imagem_perfil ?? undefined,
      tokenRefreshToken: usuarioData.refresh_token ?? undefined,
      telefone: usuarioData.telefone ?? undefined,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRefreshToken:
        usuarioData.data_expiracao_refresh_token ?? undefined,
      sisAdmin: usuarioData.sis_admin,
    });
    for (const usuarioPerfil of usuarioData.usuario_perfils) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async obterPorEmail(email: string): Promise<Usuario | undefined> {
    const usuarioData = await this.prisma.usuario.findUnique({
      include: { usuario_perfils: true },
      where: { email },
    });
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      ativo: usuarioData.ativo,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      urlPerfil: usuarioData.imagem_perfil ?? undefined,
      tokenRefreshToken: usuarioData.refresh_token ?? undefined,
      telefone: usuarioData.telefone ?? undefined,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRefreshToken:
        usuarioData.data_expiracao_refresh_token ?? undefined,
      sisAdmin: usuarioData.sis_admin,
    });
    for (const usuarioPerfil of usuarioData.usuario_perfils) {
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
    const usuarioData = await this.prisma.usuario.findFirst({
      where: { recuperar_senha_token: token },
      include: { usuario_perfils: true },
    });
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      ativo: usuarioData.ativo,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      urlPerfil: usuarioData.imagem_perfil ?? undefined,
      tokenRefreshToken: usuarioData.refresh_token ?? undefined,
      telefone: usuarioData.telefone ?? undefined,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRefreshToken:
        usuarioData.data_expiracao_refresh_token ?? undefined,
      sisAdmin: usuarioData.sis_admin,
    });

    for (const usuarioPerfil of usuarioData.usuario_perfils) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async obterUsuarioPorPerfilId(id: string): Promise<Usuario | undefined> {
    const usuarioData = await this.prisma.usuario.findFirst({
      include: { usuario_perfils: true },
      where: {
        usuario_perfils: {
          some: { perfil_id: id },
        },
      },
    });
    if (!usuarioData) return;
    const usuario = new Usuario({
      id: usuarioData.id,
      nomeCompleto: usuarioData.nome,
      email: usuarioData.email,
      senha: usuarioData.senha,
      ativo: usuarioData.ativo,
      autenticacaoDoisFatores: usuarioData.dois_fatores,
      dataCriacao: usuarioData.data_criacao,
      urlPerfil: usuarioData.imagem_perfil ?? undefined,
      tokenRefreshToken: usuarioData.refresh_token ?? undefined,
      telefone: usuarioData.telefone ?? undefined,
      tokenRecuperacaoSenha: usuarioData.recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRecuperacaoSenha:
        usuarioData.data_expiraca_recuperar_senha_token ?? undefined,
      dataExpiracaoTokenRefreshToken:
        usuarioData.data_expiracao_refresh_token ?? undefined,
      sisAdmin: usuarioData.sis_admin,
    });
    for (const usuarioPerfil of usuarioData.usuario_perfils) {
      const perfil = await this.perfilRepositorio.obterPerfilPorId(
        usuarioPerfil.perfil_id,
      );
      if (perfil) usuario.adiconarPerfil(perfil);
    }
    return usuario;
  }

  async criarUsuario(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.create({
      data: {
        id: usuario.getUuid(),
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        senha: usuario.getSenha(),
        data_criacao: usuario.getDataCriacao(),
        ativo: usuario.habilitado,
        refresh_token: usuario.getTokenReFreshToken(),
        data_expiracao_refresh_token: usuario.getDataExpiracaoTokenFreshToken(),
        recuperar_senha_token: usuario.getTokenRecuperacaoSenha(),
        data_expiraca_recuperar_senha_token:
          usuario.getDataExpiracaoRecuperacaoSenha(),
        dois_fatores: usuario.getAutenticacaoDoisFatores(),
        telefone: usuario.getTelefone(),
        imagem_perfil: usuario.getUrlPerfil(),
        sis_admin: usuario.getSisAdmin(),
      },
    });

    for (const perfil of usuario.obterPerfis) {
      await this.prisma.usuario_perfils.create({
        data: {
          perfil_id: perfil.getUuid(),
          usuario_id: usuario.getUuid(),
        },
      });
    }
  }

  async editarUsuario(usuario: Usuario): Promise<void> {
    try {
      await this.prisma.usuario.update({
        where: { id: usuario.getUuid() },
        data: {
          nome: usuario.getNome(),
          email: usuario.getEmail(),
          senha: usuario.getSenha(),
          data_criacao: usuario.getDataCriacao(),
          ativo: usuario.habilitado,
          refresh_token: usuario.getTokenReFreshToken() ?? null,
          data_expiracao_refresh_token:
            usuario.getDataExpiracaoTokenFreshToken() ?? null,
          recuperar_senha_token: usuario.getTokenRecuperacaoSenha() ?? null,
          data_expiraca_recuperar_senha_token:
            usuario.getDataExpiracaoRecuperacaoSenha() ?? null,
          dois_fatores: usuario.getAutenticacaoDoisFatores(),
          telefone: usuario.getTelefone() ?? null,
          imagem_perfil: usuario.getUrlPerfil() ?? null,
          sis_admin: usuario.getSisAdmin(),
        },
      });
    } catch {
      throw new Error(Errors.USUARIO_NAO_ENCONTRADO_ATUALIZACAO);
    }

    await this.prisma.usuario_perfils.deleteMany({
      where: { usuario_id: usuario.getUuid() },
    });
    for (const perfil of usuario.obterPerfis) {
      await this.prisma.usuario_perfils.create({
        data: {
          perfil_id: perfil.getUuid(),
          usuario_id: usuario.getUuid(),
        },
      });
    }
  }

  async excluirUsuario(id: string): Promise<void> {
    try {
      await this.prisma.usuario.delete({
        where: { id },
      });
    } catch {
      throw new Error(Errors.USUARIO_NAO_ENCONTRADO_ATUALIZACAO);
    }
  }
}
