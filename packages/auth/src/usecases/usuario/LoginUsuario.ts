import { CasoDeUso, Email } from "@packages/common";
import { Queue } from "@packages/queue";
import { QueuesAuth } from "../../constants";
import { Otp } from "../../model";
import {
  AuthToken,
  ProvedorCriptografia,
  RepositorioOtp,
  RepositorioUsuario,
} from "../../provider";

interface Entrada {
  email?: string;
  senha?: string;
}

interface Output {
  isAutenticacao2Fatores: boolean;
  tokenId: string;
  token: string;
}

export default class LoginUsuario implements CasoDeUso<Entrada, Output> {
  constructor(
    private repo: RepositorioUsuario,
    private repositorioOtp: RepositorioOtp,
    private provedorCriptografia: ProvedorCriptografia,
    private authToken: AuthToken,
    readonly queue: Queue,
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
        tokenId: "",
        token: "",
      };
    }
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      urlPerfil: usuario.getUrlPerfil(),
      isSisAdmin: usuario.getSisAdmin(),
      perfis: usuario.obterPerfis,
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const token = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenReFreshToken(token, true);
    await this.repo.editarUsuario(usuario);
    const msg = {
      userEmail: usuario.getEmail(),
      loginType: "email",
      is2fa: false,
      loginDate: new Date(),
    };
    this.queue.publish<{
      userEmail: string;
      loginType: string;
      is2fa: boolean;
      loginDate: Date;
    }>(QueuesAuth.AUTH_LOGIN_REALIZADO, msg);
    return { isAutenticacao2Fatores: false, tokenId, token };
  }
}
