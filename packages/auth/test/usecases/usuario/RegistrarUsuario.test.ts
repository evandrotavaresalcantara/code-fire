import RegistrarUsuario from "../../../src/usecases/usuario/RegistrarUsuario";
import ProvedorCriptografiaMock from "../../mock/ProvedorCriptografiaMock";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const senhaErrada = "senhaErrada";
const senha1 = "CodeFire!1";

const usuarioComSenha = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  celular: "81911112222",
  senha: senha1,
  senhaConfirmacao: senha1,
  urlPerfil: "http://imagens.io/fire.png",
};

const usuarioComSenhaErrada = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  celular: "81911112222",
  senha: senha1,
  senhaConfirmacao: senhaErrada,
  urlPerfil: "http://imagens.io/fire.png",
};

test("Deve registrar um novo usuário", async () => {
  const repo = new RepositorioUsuarioMock();
  const provedorCriptografia = new ProvedorCriptografiaMock();
  const casoDeUso = new RegistrarUsuario(repo, provedorCriptografia);

  await casoDeUso.executar(usuarioComSenha);

  const usuarioSalvo = await repo.obterPorEmail(usuarioComSenha.email);
  expect(usuarioSalvo?.getCelular()).toBe(usuarioComSenha.celular);
});

test("Deve gerar um erro ao receber atributo nomeCompleto inválido", async () => {
  const nomeCompleto = "n";
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock());

  expect(async () => {
    await casoDeUso.executar({ ...usuarioComSenha, nomeCompleto });
  }).rejects.toThrow("deve ter no mínimo 3 caracteres.");
});

test("Deve gerar um erro se já existir um usuário registrado", async () => {
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock());
  await casoDeUso.executar(usuarioComSenha);

  expect(async () => {
    await casoDeUso.executar(usuarioComSenha);
  }).rejects.toThrow("Usuário já existe.");
});

test("Deve gerar um erro ao tentar registrar usuário com senha e senha de confirmação diferentes", async () => {
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new RegistrarUsuario(repo, new ProvedorCriptografiaMock());
  await casoDeUso.executar(usuarioComSenha);

  expect(async () => {
    await casoDeUso.executar({
      ...usuarioComSenha,
      senhaConfirmacao: usuarioComSenhaErrada.senhaConfirmacao,
    });
  }).rejects.toThrow("Senhas diferentes.");
});
