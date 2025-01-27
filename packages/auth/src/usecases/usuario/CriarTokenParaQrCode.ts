import { CasoDeUso } from "@packages/common";
import crypto from "node:crypto";
import { Otp } from "../../model";
import { AuthToken, RepositorioOtp, RepositorioUsuario } from "../../provider";

interface Input {
  email: string;
}

interface Output {
  token: string;
}

export class CriarTokenParaQrCode implements CasoDeUso<Input, Output> {
  constructor(
    private repositorioUsuario: RepositorioUsuario,
    private repositorioOtp: RepositorioOtp,
    private authToken: AuthToken,
  ) {}

  async executar(entrada: Input): Promise<Output> {
    const rawToken = Otp.generateToken(48);
    const hashToken = Otp.hashToken(rawToken);
    const usuario = await this.repositorioUsuario.obterPorEmail(entrada.email);
    if (!usuario) {
      throw new Error(`Usuário ${entrada.email} não encontrado`);
    }
    const otp = new Otp(
      usuario.getEmail(),
      hashToken,
      new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
    );
    const oldOtp = await this.repositorioOtp.obterQrCodeLoginPorEmail(
      usuario.getEmail(),
    );
    if (oldOtp) this.repositorioOtp.excluirQrCodeLogin(usuario.getEmail());
    const payload = {
      id: usuario?.getUuid() || crypto.randomUUID(),
      token: rawToken,
    };
    const token = this.authToken.create(payload, "90d");
    otp.setTokenJwt(token);
    await this.repositorioOtp.criarQrCodeLogin(otp);
    return { token };
  }
}
