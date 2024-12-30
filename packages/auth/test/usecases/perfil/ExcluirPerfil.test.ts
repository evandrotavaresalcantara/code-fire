import { Id } from "@packages/common";
import { Perfil, Usuario } from "../../../src";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";
import ExcluirPerfil from "../../../src/usecases/perfil/ExcluirPerfil";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

const perfil1 = { nome: "Admin", descricao: "Administrador" };

test("Deve excluir um perfil", async () => {
  const novoPerfil1 = new Perfil(perfil1);
  const repo = new RepositorioPerfilMock([novoPerfil1]);
  const repoUsuario = new RepositorioUsuarioMock();

  const casoDeUso = new ExcluirPerfil(repo, repoUsuario);
  await casoDeUso.executar(novoPerfil1.getUuid());
  const buscarPerfil = await repo.obterPerfilPorId(novoPerfil1.getUuid());

  expect(buscarPerfil).toBeUndefined();
});
test("Deve gerar um erro ao tentar excluir um perfil inexistente", async () => {
  const repo = new RepositorioPerfilMock();
  const repoUsuario = new RepositorioUsuarioMock();

  const casoDeUso = new ExcluirPerfil(repo, repoUsuario);

  expect(async () => {
    await casoDeUso.executar(Id.novo.uuid);
  }).rejects.toThrow("perfil não existe.");
});
test("gerar um erro ao tentar excluir um perfil com usuário associado", async () => {
  const novoPerfil = new Perfil(perfil1);
  const novoUsuario = new Usuario({
    nomeCompleto: "Usuario",
    email: "usuario@io.dev",
  });
  novoUsuario.adiconarPerfil(novoPerfil);

  const repo = new RepositorioPerfilMock([novoPerfil]);
  const repoUsuario = new RepositorioUsuarioMock([novoUsuario]);

  const casoDeUso = new ExcluirPerfil(repo, repoUsuario);

  expect(async () => {
    await casoDeUso.executar(novoPerfil.getUuid());
  }).rejects.toThrow(
    "não é possível excluir o perfil. Existe usuário associado a ele.",
  );
});
