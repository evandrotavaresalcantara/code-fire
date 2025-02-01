import {
  Errors,
  Perfil,
  RepositorioPerfil,
  RepositorioPermissao,
} from "@packages/auth";
import { PrismaClient } from "@prisma/client";

export default class RepositorioPerfilPrismaPg implements RepositorioPerfil {
  private readonly prisma: PrismaClient;
  constructor(
    conexaoPrisma: PrismaClient,
    private permissaoRepositorio: RepositorioPermissao,
  ) {
    this.prisma = conexaoPrisma;
  }
  async obterPerfis(): Promise<Perfil[]> {
    const perfilsData = await this.prisma.perfil.findMany({
      include: { perfil_permissoes: true },
    });
    if (!perfilsData) return [];
    const perfils = await Promise.all(
      perfilsData.map(async (perfilData) => {
        const perfil = new Perfil({
          ...perfilData,
          dataCriacao: perfilData.data_criacao,
        });
        for (const perfilPermissao of perfilData.perfil_permissoes) {
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
    const perfilData = await this.prisma.perfil.findUnique({
      include: { perfil_permissoes: true },
      where: {
        id: id,
      },
    });
    if (!perfilData) return;
    const perfil = new Perfil({
      ...perfilData,
      dataCriacao: perfilData.data_criacao,
    });
    for (const perfilPermissao of perfilData.perfil_permissoes) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async obterPerfilPorNome(nome: string): Promise<Perfil | undefined> {
    const perfilData = await this.prisma.perfil.findFirst({
      include: { perfil_permissoes: true },
      where: {
        nome: { equals: nome },
      },
    });
    if (!perfilData) return;
    const perfil = new Perfil({
      ...perfilData,
      dataCriacao: perfilData.data_criacao,
    });
    for (const perfilPermissao of perfilData.perfil_permissoes) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async obterPerfilPorPermissaoId(id: string): Promise<Perfil | undefined> {
    const perfilData = await this.prisma.perfil.findFirst({
      include: { perfil_permissoes: true },
      where: {
        perfil_permissoes: {
          some: { permissao_id: id },
        },
      },
    });
    if (!perfilData) return;
    const perfil = new Perfil({
      ...perfilData,
      dataCriacao: perfilData.data_criacao,
    });
    for (const perfilPermissao of perfilData.perfil_permissoes) {
      const permissao = await this.permissaoRepositorio.obterPermissaoPorId(
        perfilPermissao.permissao_id,
      );
      if (permissao) perfil.adicionarPermissao(permissao);
    }
    return perfil;
  }

  async criarPerfil(perfil: Perfil): Promise<void> {
    await this.prisma.perfil.create({
      data: {
        id: perfil.getUuid(),
        nome: perfil.getNomePerfil(),
        descricao: perfil.getDescricaoPerfil(),
        ativo: perfil.getativo(),
        data_criacao: perfil.getDataCriacao(),
      },
    });

    for (const permissao of perfil.obterPermissoes) {
      await this.prisma.perfil_permissoes.create({
        data: {
          perfil_id: perfil.getUuid(),
          permissao_id: permissao.getUuid(),
        },
      });
    }
  }

  async editarPerfil(perfil: Perfil): Promise<void> {
    try {
      await this.prisma.perfil.update({
        where: {
          id: perfil.getUuid(),
        },
        data: {
          nome: perfil.getNomePerfil(),
          descricao: perfil.getDescricaoPerfil(),
          ativo: perfil.getativo(),
          data_criacao: perfil.getDataCriacao(),
        },
      });
    } catch {
      throw new Error(Errors.PERFIL_NAO_ENCONTRADO_ATUALIZACAO);
    }
    await this.prisma.perfil_permissoes.deleteMany({
      where: { perfil_id: perfil.getUuid() },
    });
    for (const permissao of perfil.obterPermissoes) {
      await this.prisma.perfil_permissoes.create({
        data: {
          perfil_id: perfil.getUuid(),
          permissao_id: permissao.getUuid(),
        },
      });
    }
  }

  async excluirPerfil(id: string): Promise<void> {
    try {
      await this.prisma.perfil.delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new Error(Errors.PERFIL_NAO_ENCONTRADO_ATUALIZACAO);
    }
  }
}
