import { AuthTokenJWTAsymmetricAdapter } from "@/adapter";
import { Usuario } from "@/model";
import { CriarTokenParaQrCode } from "@/usecases";
import RepositorioOtpMock from "../../mock/RepositorioOtpMock";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  celular: "81986598745",
  senha: hash1,
  ativo: true,
};

test("Deve lançar um error Usuario não encontrado ao gerar um token usuario nao existe", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const novoUsuario = new Usuario(usuario);
  const repositorioOtp = new RepositorioOtpMock();
  const criarTokenParaQrCode = new CriarTokenParaQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
  );
  const input = { email: "UsuarioTeste@zmail.com.teste" };
  // const output = await criarTokenParaQrCode.executar(input);
  await expect(criarTokenParaQrCode.executar(input)).rejects.toThrow(
    Error(`Usuário ${input.email} não encontrado`),
  );
  expect(
    await repositorioOtp.obterQrCodeLoginPorEmail(novoUsuario.getEmail()),
  ).toBeUndefined();
});

test("Deve gerar um token e gravar no RepositorioOTP", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const novoUsuario = new Usuario(usuario);
  const repositorioOtp = new RepositorioOtpMock();
  const criarTokenParaQrCode = new CriarTokenParaQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
  );
  const input = { email: novoUsuario.getEmail() };
  const output = await criarTokenParaQrCode.executar(input);
  expect(output.token).toBeDefined();
  expect(
    await repositorioOtp.obterQrCodeLoginPorEmail("ususariofire1@dev.io"),
  ).toBeDefined();
});
