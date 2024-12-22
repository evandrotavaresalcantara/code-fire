import { PrismaClient } from "@prisma/client";
import { Permissao, RepositorioPermissao } from "auth";

export default class RepositorioPermissaoPrismaPg implements RepositorioPermissao {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async obterPermissoes(): Promise<Permissao[]> {
        const pemissoesBD = await this.prisma.permissao.findMany()

        return pemissoesBD.map((permissao) =>
            new Permissao(
                {
                    ...pemissoesBD,
                    descricao: permissao.descricao ?? undefined,
                }

            ))
    }

    async obterPermissaoPorId(id: string): Promise<Permissao | null> {
        const permissaoBD = await this.prisma.permissao.findUnique({
            where: {
                id: id
            }
        })

        if (!permissaoBD) return null

        return new Permissao(
            {
                ...permissaoBD,
                descricao: permissaoBD?.descricao ?? undefined
            })
    }

    async obterPermissaoPorNome(nome: string): Promise<Permissao | null> {
        const permissaoBD = await this.prisma.permissao.findFirst({
            where: {
                nome: { equals: nome }
            }
        })

        if (!permissaoBD) return null
        return new Permissao({
            ...permissaoBD,
            descricao: permissaoBD.descricao ?? undefined
        })
    }

    async criarPermissao(permissao: Permissao): Promise<void> {
        await this.prisma.permissao.create({
            data: {
                id: permissao.getUuid(),
                nome: permissao.getNomePermissao(),
                descricao: permissao.getDescricaoPermissao(),
                ativo: permissao.ativo,
                dataCriacao: permissao.getDataCriacao(),
            }
        })
    }

    async editarPermissao(permissao: Permissao): Promise<void> {
        await this.prisma.permissao.update({
            where: {
                id: permissao.getUuid()
            },
            data: {
                nome: permissao.getNomePermissao(),
                descricao: permissao.getDescricaoPermissao(),
                ativo: permissao.ativo,
                dataCriacao: permissao.getDataCriacao(),
            }
        })
    }

    async excluirPermissao(id: string): Promise<void> {
        await this.prisma.permissao.delete({
            where: {
                id: id
            }
        })
    }

}