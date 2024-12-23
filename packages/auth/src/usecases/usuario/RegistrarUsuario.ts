import { CasoDeUso, Celular, Email, NomeComposto } from "common";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { RepositorioUsuario } from "../../provider";
import ProvedorCriptografia from "../../provider/ProvedorCriptografia";
import { Usuario } from "../../model";

interface Entrada {
    nomeCompleto?: string
    email?: string,
    senha?: string
    senhaConfirmacao?: string
    celular?: string
}

export default class RegistrarUsuario implements CasoDeUso<Entrada, Promise<void>> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCriptografia: ProvedorCriptografia,
    ) { }

    async executar(entrada: Entrada): Promise<Promise<void>> {
        if (entrada.senha !== entrada.senhaConfirmacao) {
            throw new Error("Senhas diferentes.")
        }

        const nomeCompleto = new NomeComposto({ valor: entrada.nomeCompleto })
        const email = new Email(entrada.email)
        const senha = new SenhaForte(entrada.senha)
        const celular = new Celular(entrada.celular)

        const hashSenha = this.provedorCriptografia.criptografar(senha.valor)

        const usuarioExiste = await this.repo.obterPorEmail(email.valor)
        if (usuarioExiste) throw new Error("Usuário já existe.")

        const usuario: Usuario = new Usuario({
            nomeCompleto: nomeCompleto.nome,
            email: email.valor,
            senha: hashSenha,
            celular: celular.semMascara
        })

        await this.repo.criarUsuario(usuario)
    }

}