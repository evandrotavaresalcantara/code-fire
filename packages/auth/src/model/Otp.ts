import { Email } from "@packages/common";
import crypto from "node:crypto";

export class Otp {
  private email: Email;

  constructor(
    email: string,
    private codigoHash: string,
    private expired_at: Date,
    private codigo?: string,
    private tokenJwt?: string,
  ) {
    this.email = new Email(email);
  }

  private static genCode() {
    return crypto.randomInt(100000, 999999).toString();
  }

  private static expires(minutes: number) {
    return new Date().getTime() + 1000 * 60 * minutes;
  }

  static create(email: string) {
    const rawCode = this.genCode();
    return new Otp(
      email,
      this.hashToken(rawCode),
      new Date(this.expires(10)),
      rawCode,
    );
  }

  getEmail() {
    return this.email.valor;
  }

  getCodigo() {
    return this.codigo;
  }

  getTokenJwt() {
    return this.tokenJwt;
  }

  setTokenJwt(token: string) {
    this.tokenJwt = token;
  }

  getCodigoHash() {
    return this.codigoHash;
  }

  getExpiredAt() {
    return this.expired_at;
  }

  private isExpired() {
    return new Date().getTime() > this.expired_at.getTime();
  }

  private isValidCode(codigo?: string) {
    if (!codigo) return false;
    const hashedCode = Otp.hashToken(codigo);
    return crypto.timingSafeEqual(
      Buffer.from(hashedCode),
      Buffer.from(this.codigoHash),
    );
  }

  isValid(codigo?: string) {
    return this.isValidCode(codigo) && !this.isExpired();
  }

  static generateToken(length = 12) {
    return crypto.randomBytes(length).toString("hex");
  }

  static hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  static verifyTokenHash(rawToken: string, hashToken: string): boolean {
    // Faz o hash do rawToken usando o mesmo método de geração
    const hashedToken = this.hashToken(rawToken);
    // Compare o hash gerado com o token que estava em hash (armazenado)
    return crypto.timingSafeEqual(
      Buffer.from(hashedToken),
      Buffer.from(hashToken),
    );
  }
}
