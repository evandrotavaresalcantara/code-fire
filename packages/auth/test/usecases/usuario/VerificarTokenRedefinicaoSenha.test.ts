import { Usuario } from "../../../src/model/index";
import { VerificarTokenRedefinicaoSenha } from "../../../src/usecases/index";
import { randomUUID } from "crypto";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("Deve verificar um token que existe e retornar true", async () => {
  const usuarioComHash = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    celular: "81911112222",
    senha: "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm",
    urlPerfil: "http://imagens.io/fire.png",
  };
  const novoUsuario = new Usuario(usuarioComHash);
  const repositorioUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const verificarTokenRedefinicaoSenha = new VerificarTokenRedefinicaoSenha(
    repositorioUsuario,
  );
  const input = { token: novoUsuario.setRecuperacaoSenha() };
  const output = await verificarTokenRedefinicaoSenha.executar(input);
  expect(output).toBeDefined();
  expect(output.isValid).toBeTruthy();
});

test("Deve verificar um token expirado e retornar false", async () => {
  const usuarioComHash = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    celular: "81911112222",
    senha: "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm",
    urlPerfil: "http://imagens.io/fire.png",
  };
  const novoUsuario = new Usuario(usuarioComHash);
  const repositorioUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const verificarTokenRedefinicaoSenha = new VerificarTokenRedefinicaoSenha(
    repositorioUsuario,
  );
  const input = { token: novoUsuario.setRecuperacaoSenha() };
  jest.advanceTimersByTime(61 * 60 * 1000);
  const output = await verificarTokenRedefinicaoSenha.executar(input);
  expect(output.isValid).toBeFalsy();
});

test("Deve verificar um token que não existe e retornar false", async () => {
  const usuarioComHash = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    celular: "81911112222",
    senha: "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm",
    urlPerfil: "http://imagens.io/fire.png",
  };
  const novoUsuario = new Usuario(usuarioComHash);
  const repositorioUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const verificarTokenRedefinicaoSenha = new VerificarTokenRedefinicaoSenha(
    repositorioUsuario,
  );
  const input = { token: randomUUID() };
  const output = await verificarTokenRedefinicaoSenha.executar(input);
  expect(output.isValid).toBeFalsy();
});
