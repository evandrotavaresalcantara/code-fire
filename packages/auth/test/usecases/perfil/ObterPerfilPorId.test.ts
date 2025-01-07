import { Id } from "@packages/common";
import { Perfil } from "../../../src";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";
import { ObterPerfilPorId } from "@/usecases/perfil/ObterPerfilPorId";

const perfil = { nome: "perfil1", descricao: "descricao" };

test("Deve obter perfil pelo Id", async () => {
  const novoPerfil = new Perfil(perfil);

  const repo = new RepositorioPerfilMock([novoPerfil]);
  const casoDeUso = new ObterPerfilPorId(repo);
  const entrada = { id: novoPerfil.getUuid() };
  const permissao = await casoDeUso.executar(entrada);

  expect(permissao?.nome).toEqual(perfil.nome);
});

test("Deve retornar null para um id não encontrado", async () => {
  const novoPerfil = new Perfil(perfil);

  const repo = new RepositorioPerfilMock([novoPerfil]);
  const casoDeUso = new ObterPerfilPorId(repo);
  const entrada = { id: Id.novo.uuid };
  const permissao = await casoDeUso.executar(entrada);

  expect(permissao).toBeNull();
});
