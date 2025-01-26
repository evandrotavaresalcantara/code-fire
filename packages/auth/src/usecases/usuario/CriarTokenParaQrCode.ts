import { CasoDeUso } from "@packages/common";
import crypto from "node:crypto";
import { Otp } from "../../model";
import { AuthToken, RepositorioOtp, RepositorioUsuario } from "../../provider";

interface Input {
  id: string;
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
    const usuario = await this.repositorioUsuario.obterUsuarioPorId(entrada.id);
    if (usuario) {
      const otp = new Otp(
        usuario.getEmail(),
        hashToken,
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 90),
      );
      const oldOtp = await this.repositorioOtp.obterOtpPorEmail(
        usuario.getEmail(),
      );
      if (oldOtp) this.repositorioOtp.excluirOtp(usuario.getEmail());
      await this.repositorioOtp.criarOtp(otp);
    }
    const payload = {
      id: usuario?.getUuid() || crypto.randomUUID(),
      token: rawToken,
    };
    const token = this.authToken.create(payload, "90d");
    return { token };
  }
}
