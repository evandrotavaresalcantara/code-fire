import { CasoDeUso, Email } from "common";
import { RepositorioUsuario } from "../../provider";
import ProvedorCriptografia from "../../provider/ProvedorCriptografia";
import Token from "../../model/TokenJwt";
import TokenJwt from "../../model/TokenJwt";

interface Entrada {
    email?: string
    senha?: string
}
type Saida = string

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCriptografia: ProvedorCriptografia
    ) { }
    async executar(entrada: Entrada): Promise<Saida> {
        const email = new Email(entrada.email)
        const usuario = await this.repo.obterPorEmail(email.valor)

        if (!usuario) throw new Error("email ou senha inválida.")
        if (!usuario.habilitado) throw new Error("Usuário desabilitado.")

        const senha = usuario.getSenha()

        if (!senha || !entrada.senha) throw new Error("email ou senha inválida.")

        const verificarSenha = this.provedorCriptografia.comparar(
            entrada.senha,
            senha
        )

        if (!verificarSenha) throw new Error('email ou senha inválida.')

        const usuarioSemSenha = usuario.semSenha()
        const token = TokenJwt.gerarToken({
            id: usuarioSemSenha.getUuid(),
            nome: usuarioSemSenha.getNome(),
            email: usuarioSemSenha.getEmail(),
            perfil: usuarioSemSenha.obterPerfis
        })
        return token
    }
}