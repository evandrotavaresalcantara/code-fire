import { Otp } from "@/model";
import { RepositorioOtp } from "@/provider";

export default class RepositorioOtpMock implements RepositorioOtp {
  constructor(
    private readonly otps: Otp[] = [],
    private readonly qrCodes: Otp[] = [],
  ) {}

  async criarOtp(otp: Otp): Promise<void> {
    this._salvar(otp);
  }

  async obterOtpPorEmail(email: string): Promise<Otp | undefined> {
    return this.otps.find((o) => o.getEmail() === email);
  }

  async excluirOtp(email: string): Promise<void> {
    const index = this.otps.findIndex((o) => o.getEmail() === email);
    if (index !== -1) {
      this.otps.splice(index, 1);
    }
  }

  private _salvar(otp: Otp): void {
    const index = this.otps.findIndex((o) => o.getEmail() === otp.getEmail());
    if (index >= 0) {
      this.otps[index] = otp;
    } else {
      this.otps.push(otp);
    }
  }

  private _salvarQrCode(otp: Otp): void {
    const index = this.qrCodes.findIndex(
      (q) => q.getEmail() === otp.getEmail(),
    );
    if (index >= 0) {
      this.qrCodes[index] = otp;
    } else {
      this.qrCodes.push(otp);
    }
  }

  async criarQrCodeLogin(otp: Otp): Promise<void> {
    this._salvarQrCode(otp);
  }

  async obterQrCodeLoginPorEmail(email: string): Promise<Otp | undefined> {
    return this.qrCodes.find((q) => q.getEmail() === email);
  }

  async excluirQrCodeLogin(email: string): Promise<void> {
    const index = this.qrCodes.findIndex((q) => q.getEmail() === email);
    if (index !== -1) {
      this.qrCodes.splice(index, 1);
    }
  }
}
