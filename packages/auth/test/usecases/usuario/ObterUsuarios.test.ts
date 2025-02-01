import { ObterUsuarios, Usuario } from "../../../src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario1 = {
  nomeCompleto: "Usuario Um",
  email: "usuarioum@dev.io",
  telefone: "81911112222",
  senha: hash1,
};
const usuario2 = {
  nomeCompleto: "Usuario Dois",
  email: "usuariodois@dev.io",
  telefone: "81933334444",
  senha: hash1,
};
test("Deve obter uma lista de usuarios", async () => {
  const novoUsuario1 = new Usuario(usuario1);
  const novoUsuario2 = new Usuario(usuario2);

  const casoDeUso = new ObterUsuarios(
    new RepositorioUsuarioMock([novoUsuario1, novoUsuario2]),
  );
  const usuarios = await casoDeUso.executar();

  expect(usuarios).toHaveLength(2);
});
