import { PrismaClient } from "@prisma/client";
import RepositorioPermissao from "@packages/auth/src/provider/RepositorioPermissao";
import { Errors, Permissao } from "@packages/auth/src";

export default class RepositorioPermissaoPrismaPg
  implements RepositorioPermissao
{
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async obterPermissoes(): Promise<Permissao[]> {
    const pemissoesBD = await this.prisma.permissao.findMany();
    return pemissoesBD.map(
      (permissao) =>
        new Permissao({
          ...permissao,
          dataCriacao: permissao.data_criacao,
        }),
    );
  }

  async obterPermissaoPorId(id: string): Promise<Permissao | undefined> {
    const permissaoBD = await this.prisma.permissao.findUnique({
      where: {
        id: id,
      },
    });
    if (!permissaoBD) return;
    return new Permissao({
      ...permissaoBD,
      dataCriacao: permissaoBD.data_criacao,
    });
  }

  async obterPermissaoPorNome(nome: string): Promise<Permissao | undefined> {
    const permissaoBD = await this.prisma.permissao.findFirst({
      where: {
        nome: { equals: nome },
      },
    });
    if (!permissaoBD) return;
    return new Permissao({
      ...permissaoBD,
      dataCriacao: permissaoBD.data_criacao,
    });
  }

  async criarPermissao(permissao: Permissao): Promise<void> {
    await this.prisma.permissao.create({
      data: {
        id: permissao.getUuid(),
        nome: permissao.getNomePermissao(),
        descricao: permissao.getDescricaoPermissao(),
        data_criacao: permissao.getDataCriacao(),
        ativo: permissao.ativo,
      },
    });
  }

  async editarPermissao(permissao: Permissao): Promise<void> {
    try {
      await this.prisma.permissao.update({
        where: {
          id: permissao.getUuid(),
        },
        data: {
          nome: permissao.getNomePermissao(),
          descricao: permissao.getDescricaoPermissao(),
          data_criacao: permissao.getDataCriacao(),
          ativo: permissao.ativo,
        },
      });
    } catch {
      throw new Error(Errors.PERMISSAO_NAO_ENCONTRADO_EXCLUSAO);
    }
  }

  async excluirPermissao(id: string): Promise<void> {
    try {
      await this.prisma.permissao.delete({
        where: {
          id: id,
        },
      });
    } catch {
      throw new Error(Errors.PERMISSAO_NAO_ENCONTRADO_EXCLUSAO);
    }
  }
}
