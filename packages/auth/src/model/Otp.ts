import { Email } from "@packages/common";
import crypto from "node:crypto";

export class Otp {
  private email: Email;

  constructor(email: string, private codigo: string, private expired_at: Date) {
    this.email = new Email(email);
  }

  private static genCode(email: string) {
    const data = `${email ?? "bucket@zmail.com"}${new Date().getTime()}`;
    return crypto
      .createHash("sha256")
      .update(data)
      .digest("hex")
      .replace(/\D/g, "")
      .slice(0, 6);
  }

  private static expires(minutes: number) {
    return new Date().getTime() + 1000 * 60 * minutes;
  }

  static create(email: string) {
    return new Otp(email, this.genCode(email), new Date(this.expires(10)));
  }

  getEmail() {
    return this.email.valor;
  }

  getCodigo() {
    return this.codigo;
  }

  getExpiredAt() {
    return this.expired_at;
  }

  private isExpired() {
    return new Date().getTime() > this.expired_at.getTime();
  }

  private isValidCode(codigo: string) {
    return codigo === this.codigo;
  }

  isValid(codigo: string) {
    return this.isValidCode(codigo) && !this.isExpired();
  }
}
