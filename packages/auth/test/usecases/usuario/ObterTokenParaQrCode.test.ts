import { AuthTokenJWTAsymmetricAdapter } from "@/adapter";
import { Usuario } from "@/model";
import { CriarTokenParaQrCode, ObterTokenParaQrCode } from "@/usecases";
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

test("Deve obter um token no RepositorioOTP através do email", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const repositorioOtp = new RepositorioOtpMock();
  const novoUsuario = new Usuario(usuario);
  const criarTokenParaQrCode = new CriarTokenParaQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
  );
  const inputCriar = { email: novoUsuario.getEmail() };
  await criarTokenParaQrCode.executar(inputCriar);
  const obterTokenParaQrCode = new ObterTokenParaQrCode(
    repositorioOtp,
    authToken,
  );
  const input = { email: usuario.email };
  const output = await obterTokenParaQrCode.executar(input);
  expect(output.token).toBeDefined();
});

test("Deve lançar um erro de Usuario nao possui QrCode obter um token no RepositorioOTP através do email", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const repositorioOtp = new RepositorioOtpMock();
  const obterTokenParaQrCode = new ObterTokenParaQrCode(
    repositorioOtp,
    authToken,
  );
  const input = { email: usuario.email };
  await expect(obterTokenParaQrCode.executar(input)).rejects.toThrow(
    Error(`Usuário ${input.email} não possui QrCode de Login e não encontrado`),
  );
});

test("Deve lançar um erro de QrCode expirado ao obter um token no RepositorioOTP através do email", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const repositorioOtp = new RepositorioOtpMock();
  const novoUsuario = new Usuario(usuario);
  const criarTokenParaQrCode = new CriarTokenParaQrCode(
    new RepositorioUsuarioMock([novoUsuario]),
    repositorioOtp,
    authToken,
  );
  const inputCriar = { email: novoUsuario.getEmail() };
  await criarTokenParaQrCode.executar(inputCriar);
  jest.advanceTimersByTime(91 * 24 * 60 * 60 * 1000); // Avança 91 dias
  const obterTokenParaQrCode = new ObterTokenParaQrCode(
    repositorioOtp,
    authToken,
  );
  const input = { email: usuario.email };
  await expect(obterTokenParaQrCode.executar(input)).rejects.toThrow(
    Error("Dados Inválidos: QrCode expirado, gere um novo QrCode"),
  );
});
