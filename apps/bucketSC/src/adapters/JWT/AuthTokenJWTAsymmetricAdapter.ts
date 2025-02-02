import jwt from "jsonwebtoken";
import { readFileSync } from "node:fs";
import path from "node:path";
import { AuthToken } from "../../core";

export class AuthTokenJWTAsymmetricAdapter implements AuthToken {
  private currentDir = path.dirname(__filename);
  private publicKey: string;

  constructor() {
    this.publicKey = readFileSync(
      path.join(this.currentDir, "public.pem"),
      "utf-8"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(payload: string | Buffer | object, expires: string | number): string {
    throw new Error("Method not implemented.");
  }

  decode<PayloadInterface>(token: string): PayloadInterface | null {
    const decoded = jwt.decode(token, { json: true });
    if (!decoded) return null;
    return decoded as PayloadInterface;
  }

  verify(token?: string): boolean {
    if (!token) return false;
    try {
      jwt.verify(token.trim(), this.publicKey, {
        algorithms: ["RS256"],
      });
      return true;
    } catch {
      return false;
    }
  }
}
