import { Permissao } from "../../../src";
import CriarPerfil from "../../../src/usecases/perfil/CriarPerfil";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock";

const perfil1 = { nome: "Admin", descricao: "Administrador" };

const permissao1 = { nome: "editar", descricao: "edicao" };
const permissao2 = { nome: "atualizar", descricao: "atualização" };
const permissao3 = { nome: "excluir", descricao: "exclusão" };

test("Deve criar um novo perfil sem nenhuma permissão", async () => {
  const repo = new RepositorioPerfilMock();
  const repoPermissao = new RepositorioPermissaoMock();
  const casoDeUso = new CriarPerfil(repo, repoPermissao);

  await casoDeUso.executar(perfil1);

  const perfil1Salvo = await repo.obterPerfilPorNome(perfil1.nome);
  expect(perfil1Salvo?.getNomePerfil()).toBe(perfil1.nome);
  expect(perfil1Salvo?.getDescricaoPerfil()).toBe(perfil1.descricao);
  expect(perfil1Salvo?.qtdPermissoes).toBe(0);
});

test("Deve criar um novo perfil, com uma permissão", async () => {
  const novaPermissao1 = new Permissao(permissao1);

  const perfilComUmaPermissao = {
    nome: "Dev",
    descricao: "Desenvolvedor",
    permissoes: [novaPermissao1.getUuid()],
  };

  const repoPermissao = new RepositorioPermissaoMock([novaPermissao1]);

  const repo = new RepositorioPerfilMock();
  const casoDeUso = new CriarPerfil(repo, repoPermissao);

  await casoDeUso.executar(perfilComUmaPermissao);

  const perfil1Salvo = await repo.obterPerfilPorNome(
    perfilComUmaPermissao.nome,
  );
  const permissao = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao1.getUuid(),
  );

  expect(permissao?.getUuid()).toEqual(novaPermissao1.getUuid());
  expect(permissao?.getNomePermissao()).toBe(novaPermissao1.getNomePermissao());
});

test("Deve criar um novo perfil, com duas permissões", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const perfilComUmaPermissao = {
    nome: "Dev",
    descricao: "Desenvolvedor",
    permissoes: [novaPermissao1.getUuid(), novaPermissao2.getUuid()],
  };
  const repoPermissao = new RepositorioPermissaoMock([
    novaPermissao1,
    novaPermissao2,
  ]);
  const repo = new RepositorioPerfilMock();
  const casoDeUso = new CriarPerfil(repo, repoPermissao);

  await casoDeUso.executar(perfilComUmaPermissao);

  const perfil1Salvo = await repo.obterPerfilPorNome(
    perfilComUmaPermissao.nome,
  );
  const permissao1Salva = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao1.getUuid(),
  );
  const permissao2Salva = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao2.getUuid(),
  );

  expect(permissao1Salva?.getUuid()).toEqual(novaPermissao1.getUuid());
  expect(permissao1Salva?.getNomePermissao()).toBe(
    novaPermissao1.getNomePermissao(),
  );
  expect(permissao2Salva?.getUuid()).toEqual(novaPermissao2.getUuid());
  expect(permissao2Salva?.getNomePermissao()).toBe(
    novaPermissao2.getNomePermissao(),
  );
  expect(perfil1Salvo?.qtdPermissoes).toBe(2);
});
test("Deve criar um novo perfil com duas permissões, mesmo passando uma terceira permissão não cadastrada", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const novaPermissao3 = new Permissao(permissao3);

  const perfilComDuasPermissoes = {
    nome: "Dev",
    descricao: "Desenvolvedor",
    permissoes: [
      novaPermissao1.getUuid(),
      novaPermissao2.getUuid(),
      novaPermissao3.getUuid(),
    ],
  };
  const repoPermissao = new RepositorioPermissaoMock([
    novaPermissao1,
    novaPermissao2,
  ]);
  const repo = new RepositorioPerfilMock();
  const casoDeUso = new CriarPerfil(repo, repoPermissao);

  await casoDeUso.executar(perfilComDuasPermissoes);

  const perfil1Salvo = await repo.obterPerfilPorNome(
    perfilComDuasPermissoes.nome,
  );
  const permissao1Salva = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao1.getUuid(),
  );
  const permissao2Salva = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao2.getUuid(),
  );

  expect(permissao1Salva?.getUuid()).toEqual(novaPermissao1.getUuid());
  expect(permissao1Salva?.getNomePermissao()).toBe(
    novaPermissao1.getNomePermissao(),
  );
  expect(permissao2Salva?.getUuid()).toEqual(novaPermissao2.getUuid());
  expect(permissao2Salva?.getNomePermissao()).toBe(
    novaPermissao2.getNomePermissao(),
  );
  expect(perfil1Salvo?.qtdPermissoes).toBe(2);
});

test("Deve lançar um erro ao tentar criar um perfil com nome já existente", async () => {
  const repo = new RepositorioPerfilMock();
  const repoPermissao = new RepositorioPermissaoMock();
  const casoDeUso = new CriarPerfil(repo, repoPermissao);

  await casoDeUso.executar(perfil1);

  expect(async () => {
    await casoDeUso.executar(perfil1);
  }).rejects.toThrow("perfil já existe.");
});
