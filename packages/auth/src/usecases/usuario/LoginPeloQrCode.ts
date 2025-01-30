import { CasoDeUso } from "@packages/common";
import { Queue } from "@packages/queue/src";
import { QueuesAuth } from "../../constants";
import { Otp } from "../../model";
import { AuthToken, RepositorioOtp, RepositorioUsuario } from "../../provider";

interface Entrada {
  token?: string;
}

interface Output {
  isAutenticacao2Fatores: boolean;
  tokenId: string;
  token: string;
}

export class LoginPeloQrCode implements CasoDeUso<Entrada, Output> {
  constructor(
    private repositorioUsuario: RepositorioUsuario,
    private repositorioOtp: RepositorioOtp,
    private authToken: AuthToken,
    readonly queue: Queue,
  ) {}

  async executar(entrada: Entrada): Promise<Output> {
    if (!this.authToken.verify(entrada.token))
      throw new Error("Dados Inválidos: QrCode não é válido");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const payload = this.authToken.decode(entrada.token!) as {
      id: string;
      token: string;
    };
    const { id, token } = payload;
    const usuario = await this.repositorioUsuario.obterUsuarioPorId(id);
    if (!usuario) throw new Error("Usuário não encontrado");
    if (!usuario.habilitado)
      throw new Error("Não Autorizado: Usuário desabilitado.");
    const otp = await this.repositorioOtp.obterQrCodeLoginPorEmail(
      usuario.getEmail(),
    );
    if (!otp) throw new Error("Dados Inválidos: QrCode não encontrado");
    if (!Otp.verifyTokenHash(token, otp.getCodigoHash()))
      throw new Error("Dados Inválidos: QrCode não é válido");
    if (usuario.getAutenticacaoDoisFatores()) {
      const otp = Otp.create(usuario.getEmail());
      await this.repositorioOtp.criarOtp(otp);
      const msg = {
        de: "noreply@security.com.br",
        para: usuario.getEmail(),
        assunto: "Código 2FA - S3CURITTY",
        corpo: `Olá ${usuario.getNome()},\n\nNós recebemos uma solicitação para acesso ao sistema que está vinculado a este e-mail. Para a sua segurança estamos enviando o código abaixo para validar e autorizar o acesso.\n\nCódigo de Validação:\n\n${otp.getCodigo()}\n\nEste código tem validade por 10 minutos. Retorne para o login e insira o código acima para liberação do acesso.\n\nAtenciosamente\nEquipe S3CURITY.\n\n\nCaso não tenha solicitado o envio do código de validação, favor desconsiderar está mensagem.`,
      };
      await this.queue.publish<{
        de: string;
        para: string;
        assunto: string;
        corpo: string;
        isHtml?: boolean;
        isTest?: boolean;
      }>(QueuesAuth.AUTH_SENHA_ESQUECIDA, msg);
      return {
        isAutenticacao2Fatores: true,
        tokenId: usuario.getEmail(), // necessário para 2fa
        token: "",
      };
    }
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const tokenRefresh = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenReFreshToken(token, true);
    await this.repositorioUsuario.editarUsuario(usuario);
    const msg = {
      userEmail: usuario.getEmail(),
      loginType: "qrCode",
      is2fa: false,
      loginDate: new Date(),
    };
    this.queue.publish<{
      userEmail: string;
      loginType: string;
      is2fa: boolean;
      loginDate: Date;
    }>(QueuesAuth.AUTH_LOGIN_REALIZADO, msg);
    return { isAutenticacao2Fatores: false, tokenId, token: tokenRefresh };
  }
}
