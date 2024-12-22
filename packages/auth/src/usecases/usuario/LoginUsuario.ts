import { CasoDeUso, Email } from "common";
import { AuthToken, RepositorioUsuario } from "../../provider";
import ProvedorCriptografia from "../../provider/ProvedorCriptografia";
<<<<<<< HEAD
=======
import Token from "../../model/TokenJwt";
import TokenJwt from "../../model/TokenJwt";
>>>>>>> 68943cb8d146d82f03f3dd3dfdd971b0f7203a75

interface Entrada {
  email?: string;
  senha?: string;
}
<<<<<<< HEAD
=======
type Saida = string

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
    constructor(
        private repo: RepositorioUsuario,
        private provedorCriptografia: ProvedorCriptografia
    ) { }
    async executar(entrada: Entrada): Promise<Saida> {
        const email = new Email(entrada.email)
        const usuario = await this.repo.obterPorEmail(email.valor)
>>>>>>> 68943cb8d146d82f03f3dd3dfdd971b0f7203a75

interface Output {
  tokenId: string;
  token: string;
}

<<<<<<< HEAD
export default class LoginUsuario implements CasoDeUso<Entrada, Output> {
  constructor(
    private repo: RepositorioUsuario,
    private provedorCriptografia: ProvedorCriptografia,
    private authToken: AuthToken,
  ) {}
  async executar(entrada: Entrada): Promise<Output> {
    const email = new Email(entrada.email);
    const usuario = await this.repo.obterPorEmail(email.valor);
    if (!usuario) throw new Error("email ou senha inválida.");
    if (!usuario.habilitado) throw new Error("Usuário desabilitado.");
    const senha = usuario.getSenha();
    if (!senha || !entrada.senha) throw new Error("email ou senha inválida.");
    const verificarSenha = this.provedorCriptografia.comparar(
      entrada.senha,
      senha,
    );
    if (!verificarSenha) throw new Error("email ou senha inválida.");
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const token = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenRecuperacaoSenha(token, true);
    await this.repo.editarUsuario(usuario);
    return { tokenId, token };
  }
}
=======
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
>>>>>>> 68943cb8d146d82f03f3dd3dfdd971b0f7203a75
