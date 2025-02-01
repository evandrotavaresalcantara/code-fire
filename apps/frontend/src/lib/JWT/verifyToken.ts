import { importSPKI, JWTPayload, jwtVerify } from "jose";

export interface JoseErrorInterface {
  code: string;
  name: string;
  claim: string;
  reason: string;
  payload: JWTPayload;
}

export interface PayloadInterface {
  id: string;
  nome: string;
  email: string;
  urlPerfil: string;
  isSisAdmin: boolean;
  perfis: string[];
}

export async function decrypt(token: string | undefined = "") {
  const spki = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsCWKi5+zgFc/PPO7YFAv
nyXY79BmsHjxQrn52qq8F00HWF4G8YLfJSKbbtu7MvCyoQMOpf7mOzpGM+Cooisl
IjBWyWgbuDRvyn4FoQHsM9lGg6QoXcetj4WMubylPXqWNrQ+nUNwWDn3XGek+7Mc
kye763oFzxwbPwueiT7hMSZnHj5nD/PF1hTNVA/ycmzaN1i4EHx3qib3PAnJW+Io
BKtQ4psgG9bDaXhe5zPvT5aOVhiQuPN3pvJNnsxzNCXMoPcJteAP81M+ax2NLMaE
Sx7gSFBrQXFOV56jmnVZGoFdJe2OhIN+hPWagVg3y64zEkm9rQTZMsAHA2DwrTd+
qQIDAQAB
-----END PUBLIC KEY-----`;
  const alg = "RS256";
  const publicKey = await importSPKI(spki, alg);
  const { payload } = await jwtVerify<PayloadInterface>(token, publicKey, {
    algorithms: ["RS256"],
  });
  return payload;
}
