import Perfil from "../../src/model/Perfil";
import Usuario from "../../src/model/Usuario";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const usuario = {
  nomeCompleto: "Maria Jullieta",
  email: "maria@dev.io",
  senha: "$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq",
  celular: "81985698585",
  urlPerfil: "https://meuperfil.online/maria.png",
  ativo: true,
  dataExpiracaoTokenRefreshToken: new Date(),
  tokenRefreshToken: "meuToken",
  autenticaçãoDoisFatores: true,
};

const usuarioMinimo = {
  nomeCompleto: "Zé Dev",
  email: "ze@dev.io",
};

test("Deve criar um usuário com perfil vazio", () => {
  const novoUsuario = new Usuario(usuario);
  expect(novoUsuario.qtdPerfils).toBe(0);
});

test("Deve criar um usuário somente com nome e email", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  expect(novoUsuario.qtdPerfils).toBe(0);
  expect(novoUsuario.getUrlPerfil()).toBeFalsy();
  expect(novoUsuario.getCelular()).toBeFalsy();
});

test("Deve exibir um usuário sem  o hash da senha", () => {
  const novoUsuario = new Usuario(usuario);
  const novoUsuarioSemSenha = novoUsuario.semSenha();
  expect(novoUsuarioSemSenha.getSenha()).toBe(null);
});

test("Deve adicionar um perfil ao usuário", () => {
  const perfil = { nome: "Admin", descricao: "Administrador", ativo: true };
  const novoPerfil = new Perfil(perfil);
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil);
  expect(novoUsuario.qtdPerfils).toBe(1);
});

test("Deve obter os perfis de um usuario", () => {
  const perfil = { nome: "Admin", descricao: "Administrador", ativo: true };
  const novoPerfil = new Perfil(perfil);
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil);
  expect(novoUsuario.qtdPerfils).toBe(1);
  expect(novoUsuario.obterPerfis).toContain(novoPerfil);
});

test("Deve adicionar dois perfis diferentes ao usuário", () => {
  const perfil1 = { nome: "criar", descricao: "criação", ativo: true };
  const perfil2 = { nome: "editar", descricao: "edição", ativo: true };
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil1);
  novoUsuario.adiconarPerfil(novoPerfil2);
  expect(novoUsuario.qtdPerfils).toBe(2);
});

test("Deve tentar cria um perfil já cadastrado", () => {
  const perfil1 = { nome: "criar", descricao: "criação", ativo: true };
  const novoPerfil1 = new Perfil(perfil1);
  const clone = novoPerfil1.clonar({});
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil1);
  novoUsuario.adiconarPerfil(clone);
  expect(novoUsuario.qtdPerfils).toBe(1);
});

test("Deve remover um perfil existente no usuario", () => {
  const perfil1 = { nome: "criar", descricao: "criação", ativo: true };
  const perfil2 = { nome: "editar", descricao: "edição", ativo: true };
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil1);
  novoUsuario.adiconarPerfil(novoPerfil2);
  novoUsuario.removerPerfil(novoPerfil1);
  expect(novoUsuario.qtdPerfils).toBe(1);
  expect(novoUsuario.obterPerfis).toContain(novoPerfil2);
});

test("Deve tentar remove uma permissão que não existe no usuario", () => {
  const perfil1 = { nome: "criar", descricao: "criação", ativo: true };
  const perfil2 = { nome: "editar", descricao: "edição", ativo: true };
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const novoUsuario = new Usuario(usuario);
  novoUsuario.adiconarPerfil(novoPerfil1);
  novoUsuario.removerPerfil(novoPerfil2);
  expect(novoUsuario.qtdPerfils).toBe(1);
  expect(novoUsuario.obterPerfis).toContain(novoPerfil1);
});

test("Deve alterar apenas tokenRefreshToken, por não ser login", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  novoUsuario.setTokenReFreshToken("abc123");
  expect(novoUsuario.getTokenReFreshToken()).toBe("abc123");
  expect(novoUsuario.getDataExpiracaoTokenFreshToken()).toBeUndefined();
});

test("Deve alterar tokenRefreshToken e a Data para + 30 dias por ser login", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  novoUsuario.setTokenReFreshToken("abc123", true);
  // console.log(novoUsuario.getDataExpiracaoTokenFreshToken());
  expect(novoUsuario.getTokenReFreshToken()).toBe("abc123");
  expect(novoUsuario.getDataExpiracaoTokenFreshToken()).toBeDefined();
});

test("Deve criar um token de redefinição de senha", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  const token = novoUsuario.setRecuperacaoSenha();
  expect(token).toBeDefined();
  expect(novoUsuario.getTokenRecuperacaoSenha()).toStrictEqual(token);
  expect(novoUsuario.getDataExpiracaoRecuperacaoSenha()).toBeDefined();
  expect(
    novoUsuario.getDataExpiracaoRecuperacaoSenha()?.getTime(),
  ).toBeGreaterThan(new Date().getTime());
});

test("Deve ao tentar criar um token de redefinição de senha dentro do prazo devolver token ja existente", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  const token1 = novoUsuario.setRecuperacaoSenha();
  const data1 = novoUsuario.getDataExpiracaoRecuperacaoSenha();
  const token2 = novoUsuario.setRecuperacaoSenha();
  const data2 = novoUsuario.getDataExpiracaoRecuperacaoSenha();
  expect(token1).toStrictEqual(token2);
  expect(data1).toStrictEqual(data2);
});

test("Deve criar um token de redefinição de senha após do prazo token anterior ter expirado", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  const token1 = novoUsuario.setRecuperacaoSenha();
  const data1 = novoUsuario.getDataExpiracaoRecuperacaoSenha();
  jest.advanceTimersByTime(61 * 60 * 1000); // Avança 1 hora e 1 minuto
  const token2 = novoUsuario.setRecuperacaoSenha();
  const data2 = novoUsuario.getDataExpiracaoRecuperacaoSenha();
  expect(token1).toBeDefined();
  expect(token2).toBeDefined();
  expect(token1 === token2).toBeFalsy();
  expect(data1).toBeDefined();
  expect(data2).toBeDefined();
  expect(data1 === data2).toBeFalsy();
});

test("Deve remover token e data expiracao de redefinição de senha", () => {
  const novoUsuario = new Usuario(usuarioMinimo);
  novoUsuario.setRecuperacaoSenha();
  novoUsuario.cleanRecuperacaoSenha();
  expect(novoUsuario.getTokenRecuperacaoSenha()).toBeUndefined();
  expect(novoUsuario.getDataExpiracaoRecuperacaoSenha()).toBeUndefined();
});
