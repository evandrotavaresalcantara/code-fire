import jwt, { PrivateKey, SignOptions } from "jsonwebtoken";
import { readFileSync } from "node:fs";
import path from "node:path";
import { AuthToken } from "../../provider";

type ExpiresIn =
  | number
  | `${number} ${"ms" | "s" | "m" | "h" | "d" | "w" | "y"}`;

export class AuthTokenJWTAsymmetricAdapter implements AuthToken {
  private currentDir = path.dirname(__filename);
  private privateKey: PrivateKey;
  private publicKey: string;

  constructor() {
    this.privateKey = readFileSync(
      path.join(this.currentDir, "private.pem"),
      "utf-8",
    ) as PrivateKey;
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

  create(payload: string | Buffer | object, expires: ExpiresIn): string {
    // return jwt.sign(payload, this.privateKey, {
    //   algorithm: "RS256",
    //   expiresIn: expires,
    // });
    const options: SignOptions = {
      algorithm: "RS256",
      expiresIn: expires, // expiresIn aceita string ou number
    };

    return jwt.sign(payload, this.privateKey, options);
  }
}
