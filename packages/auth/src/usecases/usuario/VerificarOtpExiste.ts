import { CasoDeUso } from "@packages/common";
import { RepositorioOtp } from "../../provider";

export class VerificarOtpExiste implements CasoDeUso<string, Date> {
  constructor(private repositorioOtp: RepositorioOtp) {}

  async executar(entrada: string): Promise<Date> {
    const otp = await this.repositorioOtp.obterOtpPorEmail(entrada);
    if (!otp)
      throw new Error(
        `Dados Inválidos: O e-mail ${entrada} não possui um código OTP, favor solicite novamente através do login.`,
      );
    return otp.getExpiredAt();
  }
}
