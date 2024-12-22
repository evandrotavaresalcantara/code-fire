import { PrismaClient } from "@prisma/client";
import { Perfil, RepositorioPerfil } from "auth";
import { connect } from "http2";

export default class RepositorioPerfilPrismaPg implements RepositorioPerfil {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    async obterPerfis(): Promise<Perfil[]> {
        const PerfisBD = await this.prisma.perfil.findMany()
        return PerfisBD.map((perfil) =>
            new Perfil(
                {
                    ...perfil,
                    descricao: perfil.descricao ?? undefined,
                }
            ))
    }

    async obterPerfilPorId(id: string): Promise<Perfil | null> {
        const permissaoDB = await this.prisma.perfil.findUnique({
            where: {
                id: id
            }
        })
        if (!permissaoDB) return null
        return new Perfil(
            {
                ...permissaoDB,
                descricao: permissaoDB?.descricao ?? undefined
            })
    }

    async obterPerfilPorNome(nome: string): Promise<Perfil | null> {
        const permissaoDB = await this.prisma.perfil.findFirst({
            where: {
                nome: { equals: nome }
            }
        })
        if (!permissaoDB) return null
        return new Perfil({
            ...permissaoDB,
            descricao: permissaoDB.descricao ?? undefined
        })
    }

    async obterPerfilPorPermissaoId(id: string): Promise<Perfil | null> {
        const perfilComPermissaoBD = await this.prisma.perfil.findFirst({
            where: {
                permissoes: {
                    some: { id }
                }
            }
        })
        if (!perfilComPermissaoBD) null
        return new Perfil({
            ...perfilComPermissaoBD,
            descricao: perfilComPermissaoBD?.descricao ?? undefined
        })
    }

    async criarPerfil(perfil: Perfil): Promise<void> {
        if (perfil.existePermissao) {
            await this.prisma.perfil.create({
                data: {
                    id: perfil.getUuid(),
                    nome: perfil.getNomePerfil(),
                    descricao: perfil.getDescricaoPerfil(),
                    ativo: perfil.ativo,
                    dataCriacao: perfil.getDataCriacao(),
                },
            })
        } else {
            await this.prisma.perfil.create({
                data: {
                    id: perfil.getUuid(),
                    nome: perfil.getNomePerfil(),
                    descricao: perfil.getDescricaoPerfil(),
                    ativo: perfil.ativo,
                    dataCriacao: perfil.getDataCriacao(),
                    include: {permissoes: {
                        connect: perfil.obterPermissoes.map((id) => ({ id })),
                    }}
                },
            })
        }
    }



    async editarPerfil(perfil: Perfil): Promise<void> {
        await this.prisma.perfil.update({
            where: {
                id: perfil.getUuid()
            },
            data: {
                nome: perfil.getNomePerfil(),
                descricao: perfil.getDescricaoPerfil(),
                ativo: perfil.ativo,
                dataCriacao: perfil.getDataCriacao(),
            }
        })
    }

    async excluirPerfil(id: string): Promise<void> {
        await this.prisma.perfil.delete({
            where: {
                id: id
            }
        })
    }
}