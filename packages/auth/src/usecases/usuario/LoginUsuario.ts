import { CasoDeUso, Email } from "@packages/common";
import {
  AuthToken,
  ProvedorCriptografia,
  RepositorioUsuario,
} from "../../provider";

interface Entrada {
  email?: string;
  senha?: string;
}

interface Output {
  tokenId: string;
  token: string;
}

export default class LoginUsuario implements CasoDeUso<Entrada, Output> {
  constructor(
    private repo: RepositorioUsuario,
    private provedorCriptografia: ProvedorCriptografia,
    private authToken: AuthToken,
  ) {}
  async executar(entrada: Entrada): Promise<Output> {
    const email = new Email(entrada.email);
    const usuario = await this.repo.obterPorEmail(email.valor);
    if (!usuario) throw new Error("Dados Inválidos: email ou senha inválida.");
    if (!usuario.habilitado)
      throw new Error("Não Autorizado: Usuário desabilitado.");
    const senha = usuario.getSenha();
    if (!senha || !entrada.senha)
      throw new Error("Dados Inválidos: email ou senha inválida.");
    const verificarSenha = this.provedorCriptografia.comparar(
      entrada.senha,
      senha,
    );
    if (!verificarSenha)
      throw new Error("Dados Inválidos: email ou senha inválida.");
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const token = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenReFreshToken(token, true);
    await this.repo.editarUsuario(usuario);
    return { tokenId, token };
  }
}
