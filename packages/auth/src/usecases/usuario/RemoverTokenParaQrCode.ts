import { CasoDeUso } from "@packages/common";
import { RepositorioOtp } from "../../provider";

interface Input {
  email: string;
}

export class RemoverTokenParaQrCode implements CasoDeUso<Input, void> {
  constructor(private repositorioOtp: RepositorioOtp) {}

  async executar(entrada: Input): Promise<void> {
    await this.repositorioOtp.excluirQrCodeLogin(entrada.email);
  }
}
