import { Id } from "@packages/common";
import { ObterPermissaoPorId, Permissao } from "../../../src";
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock";

const permissao1 = { nome: "vizualizar", descricao: "vizualização" };

test("Deve obter permissao pelo Id", async () => {
  const novaPermissao1 = new Permissao(permissao1);

  const repo = new RepositorioPermissaoMock([novaPermissao1]);
  const casoDeUso = new ObterPermissaoPorId(repo);
  const entrada = { id: novaPermissao1.getUuid() };
  const permissao = await casoDeUso.executar(entrada);

  expect(permissao?.nome).toEqual(permissao1.nome);
});

test("Deve retornar null para um id não encontrado", async () => {
  const novaPermissao1 = new Permissao(permissao1);

  const repo = new RepositorioPermissaoMock([novaPermissao1]);
  const casoDeUso = new ObterPermissaoPorId(repo);
  const entrada = { id: Id.novo.uuid };
  const permissao = await casoDeUso.executar(entrada);

  expect(permissao).toBeNull();
});
