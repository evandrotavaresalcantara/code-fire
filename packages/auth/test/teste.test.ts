import crypto from "node:crypto";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import speakeasy from "speakeasy";

test.only("deve gerar um secret token", () => {
  const secretHex = crypto.randomBytes(48).toString("hex");
  console.log(secretHex);
  // const secret = OTPAuth.Secret.fromHex(secretHex);
  // console.log(secret.base32);
  // TGEEA3C36QVCEYPKWOPS6PVL6RBHKDVC2WZX45QSERJPQTYQVEAWZCYZDJ726B7KJQ3R3PAHSY5OE
  // VPZTW7LCUI7HXWD2UN7IWKUVERAKGB6OCSI73KUTBDHKUMQURAZ75JYDDNHUKWEL24THWWZ2AHFGK
  const secret = speakeasy.generateSecret({ length: 20 });
  console.log(secret);
  const otpauthUrl = `otpauth://totp/MinhaApp:admin@zmail.com?secret=${secret.base32}&issuer=MinhaApp`;
  QRCode.toDataURL(otpauthUrl, { type: "image/webp" }, (err, dataUrl) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(dataUrl);
  });
});

test("Deve gerar um QrCode de um secret", () => {
  const totp = new OTPAuth.TOTP({
    issuer: "S3curity", // Emissor
    label: "admin@admin.com", // e-mail do usuário
    algorithm: "SHA1", // algoritmo aceito pelo google authenticator
    digits: 6, // quantidade de caracteres para ser inserido no otp form
    period: 30, // 30 segundos
    secret:
      "TGEEA3C36QVCEYPKWOPS6PVL6RBHKDVC2WZX45QSERJPQTYQVEAWZCYZDJ726B7KJQ3R3PAHSY5OE", // secret de cada usuario
  });
  const uri = totp.toString();
  QRCode.toString(uri, { type: "terminal" }, (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    // console.log(data);
    return data;
  });
});

test("Deve verificar se é válido codigo", () => {
  const totp = new OTPAuth.TOTP({
    issuer: "S3curity", // Emissor
    label: "admin@admin.com", // e-mail do usuário
    algorithm: "SHA1", // algoritmo aceito pelo google authenticator
    digits: 6, // quantidade de caracteres para ser inserido no otp form
    period: 30, // 30 segundos
    secret:
      "TGEEA3C36QVCEYPKWOPS6PVL6RBHKDVC2WZX45QSERJPQTYQVEAWZCYZDJ726B7KJQ3R3PAHSY5OE", // secret de cada usuario
  });
  const codigoOtp = "402233";
  const delta = totp.validate({ token: codigoOtp, window: 1 });
  console.log(delta);
});
