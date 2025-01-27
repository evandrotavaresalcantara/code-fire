import { AuthTokenJWTAsymmetricAdapter } from "@/adapter";
import { Usuario } from "@/model";
import { CriarTokenParaQrCode, LoginPeloQrCode } from "@/usecases";
import { RabbitMQAdapter } from "@packages/queue/src";
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

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("Deve realizar login pelo Token do QrCode", async () => {
  const queue = RabbitMQAdapter.getInstance();
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const repositorioOtp = new RepositorioOtpMock();
  const novoUsuario = new Usuario(usuario);
  const criarTokenParaQrCode = new CriarTokenParaQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
  );
  const inputCriar = { email: novoUsuario.getEmail() };
  const tokenJwt = await criarTokenParaQrCode.executar(inputCriar);
  const input = { token: tokenJwt.token };
  const loginPeloQrCode = new LoginPeloQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
    queue,
  );
  const output = await loginPeloQrCode.executar(input);
  expect(output.tokenId).toBeDefined();
  expect(output.token).toBeDefined();
  expect(output.isAutenticacao2Fatores).toBeFalsy();
});

test("Deve lancar erro de QrCode não é valido", async () => {
  const queue = RabbitMQAdapter.getInstance();
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const repositorioOtp = new RepositorioOtpMock();
  const novoUsuario = new Usuario(usuario);
  const input = { token: "abc123asd456" };
  const loginPeloQrCode = new LoginPeloQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
    queue,
  );
  await expect(loginPeloQrCode.executar(input)).rejects.toThrow(
    Error("Dados Inválidos: QrCode não é válido"),
  );
});
