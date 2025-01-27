import { Id } from "@packages/common";
import { Usuario } from "../../../src";
import AtualizarUsuario from "../../../src/usecases/usuario/AtualizarUsuario";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario = {
  nomeCompleto: "Fire Dev",
  email: "ususariofire1@dev.io",
  telefone: "81911112222",
  senha: hash1,
  urlPerfil: "http://imagens.io/fire.png",
  ativo: true,
};

const usuarioAtualizado = {
  nomeCompleto: "Fire Dev atualizado",
  telefone: "81922223333",
  urlPerfil: "http://imagens.io/fireAtualizado.png",
  ativo: true,
  email: "ususariofire1up@dev.io",
};

test("Deve atualizar nome, telefone e url do usuário", async () => {
  const novoUsuario = new Usuario(usuario);
  const repoUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const casoDeUso = new AtualizarUsuario(repoUsuario);

  await casoDeUso.executar({
    id: novoUsuario.getUuid(),
    nomeCompleto: usuarioAtualizado.nomeCompleto,
    telefone: usuarioAtualizado.telefone,
    urlPerfil: usuarioAtualizado.urlPerfil,
    email: usuarioAtualizado.email,
  });

  const usuarioSalvo = await repoUsuario.obterUsuarioPorId(
    novoUsuario.getUuid(),
  );

  expect(usuarioSalvo?.getNome()).toBe(usuarioAtualizado.nomeCompleto);
  expect(usuarioSalvo?.getTelefone()).toBe(usuarioAtualizado.telefone);
  expect(usuarioSalvo?.getUrlPerfil()).toBe(usuarioAtualizado.urlPerfil);
});

test("Deve gerar um erro ao tentar atualizar um usuário que não existe", async () => {
  const novoUsuario = new Usuario(usuario);
  const repoUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const casoDeUso = new AtualizarUsuario(repoUsuario);

  expect(async () => {
    await casoDeUso.executar({
      id: Id.novo.uuid,
      nomeCompleto: usuarioAtualizado.nomeCompleto,
      telefone: usuarioAtualizado.telefone,
      urlPerfil: usuarioAtualizado.urlPerfil,
    });
  }).rejects.toThrow("usuário não existe.");
});
