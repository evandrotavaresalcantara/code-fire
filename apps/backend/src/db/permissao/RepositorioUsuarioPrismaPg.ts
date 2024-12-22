import { PrismaClient } from "@prisma/client";
import { Usuario, RepositorioUsuario } from "auth";

export default class RepositorioUsuarioPrismaPg implements RepositorioUsuario {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async obterUsuarios(): Promise<Usuario[]> {
        const usuarioBD = await this.prisma.usuario.findMany()
        return usuarioBD.map((usuario) =>
            new Usuario(
                {
                    ...usuario,
                    dataExpiracaoToken: usuario.dataExpiracaoToken ?? undefined,
                    senha: usuario.senha ?? undefined,
                    celular: usuario.celular ?? undefined,
                    urlPerfil: usuario.urlPerfil ?? undefined
                }
            ))
    }

    async obterUsuarioPorId(id: string): Promise<Usuario | null> {
        const usuarioBD = await this.prisma.usuario.findUnique({
            where: {
                id: id
            }
        })
        if (!usuarioBD) return null

        return new Usuario({
            ...usuarioBD,
            dataExpiracaoToken: usuarioBD.dataExpiracaoToken ?? undefined,
            senha: usuarioBD.senha ?? undefined,
            celular: usuarioBD.celular ?? undefined,
            urlPerfil: usuarioBD.urlPerfil ?? undefined
        })
    }

    async obterPorEmail(email: string): Promise<Usuario | null> {
        const usuarioBD = await this.prisma.usuario.findUnique({
            where: { email }
        })
        if (!usuarioBD) return null
        return new Usuario({
            ...usuarioBD,
            dataExpiracaoToken: usuarioBD.dataExpiracaoToken ?? undefined,
            senha: usuarioBD.senha ?? undefined,
            celular: usuarioBD.celular ?? undefined,
            urlPerfil: usuarioBD.urlPerfil ?? undefined
        })
    }

    async obterUsuarioPorPerfilId(id: string): Promise<Usuario | null> {
        const usuarioComPerfilBD = await this.prisma.usuario.findFirst({
            where: {
                perfis: {
                    some: { id }
                }
            }
        })
        if (!usuarioComPerfilBD) return null
        return new Usuario({
            ...usuarioComPerfilBD,
            dataExpiracaoToken: usuarioComPerfilBD.dataExpiracaoToken ?? undefined,
            senha: usuarioComPerfilBD.senha ?? undefined,
            celular: usuarioComPerfilBD.celular ?? undefined,
            urlPerfil: usuarioComPerfilBD.urlPerfil ?? undefined
        })
    }

    async criarUsuario(usuario: Usuario): Promise<void> {
        await this.prisma.usuario.create({
            data: {
                id: usuario.getUuid(),
                email: usuario.getEmail(),
                nomeCompleto: usuario.getNome(),
                dataCriacao: usuario.getDataCriacao(),
                ativo: usuario.habilitado,
                dataExpiracaoToken: usuario.getDataExpiracaoToken(),
                autenticaçãoDoisFatores: usuario.autenticacaoDoisFatores,
                senha: usuario.getSenha(),
                celular: usuario.getCelular(),
                urlPerfil: usuario.getUrlPerfil(),
                tokenRecuperacaoSenha: usuario.tokenRecuperacaoSenha,
            }
        })
    }

    async editarUsuario(usuario: Usuario): Promise<void> {
        await this.prisma.usuario.update({
            where: {id: usuario.getUuid()},
            data:{
                email: usuario.getEmail(),
                nomeCompleto: usuario.getNome(),
                dataCriacao: usuario.getDataCriacao(),
                ativo: usuario.habilitado,
                dataExpiracaoToken: usuario.getDataExpiracaoToken(),
                autenticaçãoDoisFatores: usuario.autenticacaoDoisFatores,
                senha: usuario.getSenha(),
                celular: usuario.getCelular(),
                urlPerfil: usuario.getUrlPerfil(),
                tokenRecuperacaoSenha: usuario.tokenRecuperacaoSenha,
            }
        })
    }

    async excluirUsuario(id: string): Promise<void> {
        await this.prisma.usuario.delete({
            where: {id}
        })
    }
}