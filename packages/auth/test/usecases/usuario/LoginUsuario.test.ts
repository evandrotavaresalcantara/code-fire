import { AuthTokenJWTAsymmetricAdapter } from "../../../src/adapter/index";
import { Usuario } from "../../../src";
import LoginUsuario from "../../../src/usecases/usuario/LoginUsuario";
import ProvedorCriptografiaMock from "../../mock/ProvedorCriptografiaMock";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const senhaErrada = "CodeFire";
const senha1 = "CodeFire!1";
const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";

test.skip("Deve fazer o login e retornar tokens válido", async () => {
  const usuario = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    telefone: "81986598745",
    senha: hash1,
    ativo: true,
  };
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const novoUsuario = new Usuario(usuario);
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock([novoUsuario]),
    new ProvedorCriptografiaMock(),
    authToken,
  );
  const tokenUsuarioLogado = await casoDeUso.executar({
    email: usuario.email,
    senha: senha1,
  });

  expect(tokenUsuarioLogado).toBeDefined();
  expect(authToken.verify(tokenUsuarioLogado.tokenId)).toBeDefined();
  expect(authToken.verify(tokenUsuarioLogado.token)).toBeDefined();
});

test.skip("Deve gerar um erro ao tentar fazer o login com email errado.", async () => {
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock(),
    new ProvedorCriptografiaMock(),
    new AuthTokenJWTAsymmetricAdapter(),
  );
  const email = "naoexiste@email.com.br";
  const senha = "123456789";

  expect(async () => {
    await casoDeUso.executar({ email, senha });
  }).rejects.toThrow("email ou senha inválida.");
});

test.skip("Deve gerar um erro ao tentar fazer o login com a senha errada", async () => {
  const usuario = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    telefone: "81986598745",
    senha: hash1,
    ativo: true,
  };
  const novoUsuario = new Usuario(usuario);
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock([novoUsuario]),
    new ProvedorCriptografiaMock(),
    new AuthTokenJWTAsymmetricAdapter(),
  );

  expect(async () => {
    await casoDeUso.executar({ email: usuario.email, senha: senhaErrada });
  }).rejects.toThrow("email ou senha inválida.");
});

test.skip("Deve gerar um erro ao tentar fazer o login com usuário desabilitado", async () => {
  const usuario = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    telefone: "81986598745",
    senha: hash1,
    ativo: false,
  };
  const novoUsuario = new Usuario(usuario);
  const casoDeUso = new LoginUsuario(
    new RepositorioUsuarioMock([novoUsuario]),
    new ProvedorCriptografiaMock(),
    new AuthTokenJWTAsymmetricAdapter(),
  );
  expect(async () => {
    await casoDeUso.executar({ email: usuario.email, senha: senhaErrada });
  }).rejects.toThrow("Usuário desabilitado.");
});
