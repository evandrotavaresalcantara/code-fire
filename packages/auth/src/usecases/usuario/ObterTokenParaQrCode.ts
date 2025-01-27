import { CasoDeUso } from "@packages/common";
import { AuthToken, RepositorioOtp } from "../../provider";

interface Input {
  email: string;
}

interface Output {
  token: string;
}

export class ObterTokenParaQrCode implements CasoDeUso<Input, Output> {
  constructor(
    private repositorioOtp: RepositorioOtp,
    private authToken: AuthToken,
  ) {}

  async executar(entrada: Input): Promise<Output> {
    const otp = await this.repositorioOtp.obterQrCodeLoginPorEmail(
      entrada.email,
    );
    if (!otp)
      throw new Error(
        `Usuário ${entrada.email} não possui QrCode de Login e não encontrado`,
      );
    if (!this.authToken.verify(otp.getTokenJwt()))
      throw new Error("Dados Inválidos: QrCode expirado, gere um novo QrCode");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { token: otp.getTokenJwt()! };
  }
}
