import { Permissao } from "../../../src";
import EditarPermissao from "../../../src/usecases/permissao/EditarPermissao";
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock";

const permissao1 = { nome: "vizualizar", descricao: "vizualização" };
const permissao2 = { nome: "editar", descricao: "edição" };

test("Deve editar uma permissão", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const repo = new RepositorioPermissaoMock([novaPermissao1]);
  const casoDeUso = new EditarPermissao(repo);

  const permissao1Atualizada = {
    id: novaPermissao1.getUuid(),
    nome: "vizualizar-mod",
    descricao: "vizualização-mod",
  };
  await casoDeUso.executar(permissao1Atualizada);
  const novaPermissaoAtualizada = await repo.obterPermissaoPorId(
    novaPermissao1.getUuid(),
  );

  expect(novaPermissaoAtualizada?.getNomePermissao()).toEqual(
    permissao1Atualizada.nome,
  );
  expect(novaPermissaoAtualizada?.getDescricaoPermissao()).toEqual(
    permissao1Atualizada.descricao,
  );
});

test("Deve editar um permissão com nome já existente se for da própria permissao", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const repo = new RepositorioPermissaoMock([novaPermissao1, novaPermissao2]);
  const casoDeUso = new EditarPermissao(repo);

  const permissaoAtualizada = {
    id: novaPermissao1.getUuid(),
    nome: "vizualizar",
    descricao: "vizualização-mod",
  };
  await casoDeUso.executar(permissaoAtualizada);
  const novaPermissaoAtualizada = await repo.obterPermissaoPorId(
    novaPermissao1.getUuid(),
  );

  expect(novaPermissaoAtualizada?.getNomePermissao()).toEqual(
    permissaoAtualizada.nome,
  );
  expect(novaPermissaoAtualizada?.getDescricaoPermissao()).toEqual(
    permissaoAtualizada.descricao,
  );
});

test("Deve gerar um erro ao tentar editar um nova permissão com nome já existente", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const repo = new RepositorioPermissaoMock([novaPermissao1, novaPermissao2]);
  const casoDeUso = new EditarPermissao(repo);

  const permissaoAtualizada = {
    id: novaPermissao2.getUuid(),
    nome: "vizualizar",
    descricao: "vizualização",
  };
  expect(async () => {
    await casoDeUso.executar(permissaoAtualizada);
  }).rejects.toThrow("nome da permissão já existe.");
});

test("Deve gerar um erro ao tentar editar uma permissão inexistente", async () => {
  const repo = new RepositorioPermissaoMock();
  const casoDeUso = new EditarPermissao(repo);

  expect(async () => {
    await casoDeUso.executar(permissao1);
  }).rejects.toThrow("permissão não existe.");
});
