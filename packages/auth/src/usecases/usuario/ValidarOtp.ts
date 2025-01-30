import { CasoDeUso, Email } from "@packages/common";
import { Queue } from "@packages/queue/src";
import { QueuesAuth } from "../../constants";
import { AuthToken, RepositorioOtp, RepositorioUsuario } from "../../provider";

interface Entrada {
  email?: string;
  codigoOtp?: string;
  loginType: string;
}

interface Output {
  tokenId: string;
  token: string;
}

export class ValidarOtp implements CasoDeUso<Entrada, Output> {
  constructor(
    private repo: RepositorioUsuario,
    private repositorioOtp: RepositorioOtp,
    private authToken: AuthToken,
    readonly queue: Queue,
  ) {}
  async executar(entrada: Entrada): Promise<Output> {
    const email = new Email(entrada.email);
    const usuario = await this.repo.obterPorEmail(email.valor);
    if (!usuario)
      throw new Error("Dados Inválidos: email ou código OTP inválido.");
    if (!usuario.habilitado)
      throw new Error("Não Autorizado: Usuário desabilitado.");
    const otp = await this.repositorioOtp.obterOtpPorEmail(email.valor);
    if (!otp || !entrada.codigoOtp)
      throw new Error("Dados Inválidos: email ou código OTP inválido.");
    if (!otp.isValid(entrada.codigoOtp))
      throw new Error("Dados Inválidos: email ou código OTP inválido.");
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      isSisAdmin: usuario.getSisAdmin(),
      perfis: usuario.obterPerfis,
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const token = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenReFreshToken(token, true);
    await this.repo.editarUsuario(usuario);
    await this.repositorioOtp.excluirOtp(email.valor);
    const msg = {
      userEmail: usuario.getEmail(),
      loginType: entrada.loginType,
      is2fa: true,
      loginDate: new Date(),
    };
    this.queue.publish<{
      userEmail: string;
      loginType: string;
      is2fa: boolean;
      loginDate: Date;
    }>(QueuesAuth.AUTH_LOGIN_REALIZADO, msg);
    return { tokenId, token };
  }
}
