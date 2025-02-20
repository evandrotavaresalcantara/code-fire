import { Usuario } from "../../../src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";
import RemoverUsuario from "../../../src/usecases/usuario/RemoverUsuario";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  telefone: "81911112222",
  senha: hash1,
  urlPerfil: "http://imagens.io/fire.png",
};

test("Deve remover um usuário", async () => {
  const novoUsuario = new Usuario(usuario);
  const repo = new RepositorioUsuarioMock([novoUsuario]);
  const casoDeUso = new RemoverUsuario(repo);

  await casoDeUso.executar(novoUsuario.getUuid());
  const usuarioSalvo = await repo.obterUsuarioPorId(novoUsuario.getUuid());
  expect(usuarioSalvo).toBeUndefined();
});
