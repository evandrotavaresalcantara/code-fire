import { Otp, RepositorioOtp } from "@packages/auth";
import { DatabaseConnection } from "./providers";
import { OtpSchema, QrCodeLoginSchema } from "./schemas";

export class RepositorioOtpPgPromiseAdapter implements RepositorioOtp {
  private conexao: DatabaseConnection;
  private tabelaOtp = "otp";
  private tabelaQrCodeLogin = "qr_code_login";

  constructor(databaseConnection: DatabaseConnection) {
    this.conexao = databaseConnection;
  }

  async criarOtp(otp: Otp): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaOtp} (email, codigo, expira_em) VALUES ($1, $2, $3)`;
    await this.conexao.query(statement, [
      otp.getEmail(),
      otp.getCodigoHash(),
      otp.getExpiredAt(),
    ]);
  }

  async obterOtpPorEmail(email: string): Promise<Otp | undefined> {
    const statement = `SELECT * FROM ${this.tabelaOtp} WHERE email = $1`;
    const [otpData] = await this.conexao.query<OtpSchema[]>(statement, [email]);
    if (!otpData) return;
    return new Otp(otpData.email, otpData.codigo, new Date(otpData.expira_em));
  }

  async excluirOtp(email: string): Promise<void> {
    const statement = `DELETE FROM ${this.tabelaOtp} WHERE email = $1`;
    await this.conexao.query(statement, [email]);
  }

  async criarQrCodeLogin(otp: Otp): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaQrCodeLogin} (email, codigo, expira_em, token) VALUES ($1, $2, $3, $4)`;
    await this.conexao.query(statement, [
      otp.getEmail(),
      otp.getCodigoHash(),
      otp.getExpiredAt(),
      otp.getTokenJwt(),
    ]);
  }

  async obterQrCodeLoginPorEmail(email: string): Promise<Otp | undefined> {
    const statement = `SELECT * FROM ${this.tabelaQrCodeLogin} WHERE email = $1`;
    const [otpData] = await this.conexao.query<QrCodeLoginSchema[]>(statement, [
      email,
    ]);
    if (!otpData) return;
    return new Otp(
      otpData.email,
      otpData.codigo,
      new Date(otpData.expira_em),
      undefined,
      otpData.token,
    );
  }

  async excluirQrCodeLogin(email: string): Promise<void> {
    const statement = `DELETE FROM ${this.tabelaQrCodeLogin} WHERE email = $1`;
    await this.conexao.query(statement, [email]);
  }
}
