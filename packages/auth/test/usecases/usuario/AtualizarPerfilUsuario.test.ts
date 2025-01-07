import { Perfil, Usuario } from "../../../src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";
import AtualizarPerfil from "@/usecases/usuario/AtualizarPerfilUsuario";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  celular: "81911112222",
  senha: hash1,
  urlPerfil: "http://imagens.io/fire.png",
};

const perfil1 = {
  nome: "perfil1",
  descricao: "perfil1-descricao",
};

const perfil2 = {
  nome: "perfil2",
  descricao: "perfil2-descricao",
};

test("Deve atualizar perfil do usuário", async () => {
  const novoUsuario = new Usuario(usuario);
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const repoUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const repoPerfil = new RepositorioPerfilMock([novoPerfil1, novoPerfil2]);
  const casoDeUso = new AtualizarPerfil(repoUsuario, repoPerfil);

  await casoDeUso.executar({
    id: novoUsuario.getUuid(),
    perfis: [novoPerfil1.getUuid(), novoPerfil2.getUuid()],
  });

  const usuarioSalvo = await repoUsuario.obterUsuarioPorId(
    novoUsuario.getUuid(),
  );

  expect(usuarioSalvo?.qtdPerfils).toBe(2);
});
