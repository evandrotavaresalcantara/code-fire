import { Id } from "@packages/common";
import { ObterUsuarioPorId, Usuario } from "../../../src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";

test("Deve obter usuário pelo Id", async () => {
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    celular: "81911112222",
    senha: hash1,
  };
  const novoUsuario = new Usuario(usuario);

  const casoDeUso = new ObterUsuarioPorId(
    new RepositorioUsuarioMock([novoUsuario]),
  );
  const entrada = { id: `${novoUsuario.getUuid()}` };
  const usuarioBD = await casoDeUso.executar(entrada);

  expect(usuarioBD?.id).toEqual(novoUsuario.getUuid());
});

test("Deve retornar null para id não encontrado", async () => {
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    celular: "81911112222",
    senha: hash1,
  };
  const novoUsuario = new Usuario(usuario);

  const casoDeUso = new ObterUsuarioPorId(
    new RepositorioUsuarioMock([novoUsuario]),
  );
  const entrada = { id: Id.novo.uuid };
  const usuarioBD = await casoDeUso.executar(entrada);

  expect(usuarioBD).toBeNull();
});
