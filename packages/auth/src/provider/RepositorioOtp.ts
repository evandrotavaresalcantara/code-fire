import { Otp } from "../model";

export interface RepositorioOtp {
  criarOtp(otp: Otp): Promise<void>;
  obterOtpPorEmail(email: string): Promise<Otp | undefined>;
  excluirOtp(email: string): Promise<void>;
  criarQrCodeLogin(otp: Otp): Promise<void>;
  obterQrCodeLoginPorEmail(email: string): Promise<Otp | undefined>;
  excluirQrCodeLogin(email: string): Promise<void>;
}
