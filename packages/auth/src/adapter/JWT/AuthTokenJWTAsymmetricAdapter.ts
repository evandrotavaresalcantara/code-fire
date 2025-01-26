import jwt from "jsonwebtoken";
import { readFileSync } from "node:fs";
import path from "node:path";
import { AuthToken } from "../../provider";

export class AuthTokenJWTAsymmetricAdapter implements AuthToken {
  private currentDir = path.dirname(__filename);
  private privateKey: string;
  private publicKey: string;

  constructor() {
    this.privateKey = readFileSync(
      path.join(this.currentDir, "private.pem"),
      "utf-8",
    );
    this.publicKey = readFileSync(
      path.join(this.currentDir, "public.pem"),
      "utf-8",
    );
  }

  decode(token: string): string | object | null {
    return jwt.decode(token, { json: true });
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

  create(payload: string | Buffer | object, expires: string | number): string {
    return jwt.sign(payload, this.privateKey, {
      algorithm: "RS256",
      expiresIn: expires,
    });
  }
}
