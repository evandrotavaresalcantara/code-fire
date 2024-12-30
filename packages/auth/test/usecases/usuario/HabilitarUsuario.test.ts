import { Id } from "@packages/common";
import { Usuario } from "../../../src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";
import HabilitarUsuario from "../../../src/usecases/usuario/HabilitarUsuario";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  celular: "81911112222",
  senha: hash1,
  urlPerfil: "http://imagens.io/fire.png",
  ativo: false,
};

test("Deve habilitar um usuário desabilitado", async () => {
  const novoUsuario = new Usuario(usuario);
  const repo = new RepositorioUsuarioMock([novoUsuario]);

  const casoDeUso = new HabilitarUsuario(repo);
  await casoDeUso.executar(novoUsuario.getUuid());
  const usuarioSalvo = await repo.obterUsuarioPorId(novoUsuario.getUuid());
  expect(usuarioSalvo?.habilitado).toBeTruthy();
});

test("Deve gerar um erro ao tentar habilitar um usuário que não exsiste", async () => {
  const repo = new RepositorioUsuarioMock();
  const casoDeUso = new HabilitarUsuario(repo);

  expect(async () => {
    await casoDeUso.executar(Id.novo.uuid);
  }).rejects.toThrow("usuário não existe.");
});
