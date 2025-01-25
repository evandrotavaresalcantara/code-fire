import { Otp, RepositorioOtp } from "@packages/auth/src";
import { DatabaseConnection } from "./providers";
import { OtpSchema } from "./schemas";

export class RepositorioOtpPgPromiseAdapter implements RepositorioOtp {
  private conexao: DatabaseConnection;
  private tabelaOtp = "otp";

  constructor(databaseConnection: DatabaseConnection) {
    this.conexao = databaseConnection;
  }

  async criarOtp(otp: Otp): Promise<void> {
    const statement = `INSERT INTO ${this.tabelaOtp} (email, codigo, expira_em) VALUES ($1, $2, $3)`;
    await this.conexao.query(statement, [
      otp.getEmail(),
      otp.getCodigo(),
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
}
