import { Id } from "@packages/common";
import { Perfil, Permissao } from "../../../src";
import EditarPerfil from "../../../src/usecases/perfil/EditarPerfil";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock";

const perfil1 = { nome: "Admin", descricao: "Administrador" };
const perfil2 = { nome: "Dev", descricao: "Desenvolvimento" };

const permissao1 = { nome: "editar", descricao: "edicao" };
const permissao2 = { nome: "atualizar", descricao: "atualização" };

test("Deve elterar a descrição do perfil", async () => {
  const novoPerfil1 = new Perfil(perfil1);
  const repo = new RepositorioPerfilMock([novoPerfil1]);
  const repoPermissao = new RepositorioPermissaoMock();

  const perfil1Atualizado = {
    id: novoPerfil1.getUuid(),
    nome: "Admin-atualizado",
    descricao: "Administrador-atualizado",
  };
  const casoDeUso = new EditarPerfil(repo, repoPermissao);
  await casoDeUso.executar(perfil1Atualizado);
  const perfil1Salvo = await repo.obterPerfilPorId(novoPerfil1.getUuid());

  expect(perfil1Salvo?.getDescricaoPerfil()).toEqual(
    perfil1Atualizado.descricao,
  );
  expect(perfil1Salvo?.getDescricaoPerfil()).not.toEqual(perfil1.descricao);
});

test("Deve elterar o nome do perfil", async () => {
  const novoPerfil1 = new Perfil(perfil1);
  const repo = new RepositorioPerfilMock([novoPerfil1]);
  const repoPermissao = new RepositorioPermissaoMock();

  const perfil1Atualizado = {
    id: novoPerfil1.getUuid(),
    nome: "Admin-atualizado",
    descricao: "Administrador-atualizado",
  };
  const casoDeUso = new EditarPerfil(repo, repoPermissao);
  await casoDeUso.executar(perfil1Atualizado);
  const perfil1Salvo = await repo.obterPerfilPorId(novoPerfil1.getUuid());

  expect(perfil1Salvo?.getNomePerfil()).toEqual(perfil1Atualizado.nome);
  expect(perfil1Salvo?.getNomePerfil()).not.toEqual(perfil1.nome);
});

test("Deve adicionar uma permissão ao perfil", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novoPerfil = new Perfil(perfil1);

  const perfilComUmaPermissao = {
    id: novoPerfil.getUuid(),
    permissoes: [novaPermissao1.getUuid()],
  };
  const repo = new RepositorioPerfilMock([novoPerfil]);
  const repoPermissao = new RepositorioPermissaoMock([novaPermissao1]);
  const casoDeUso = new EditarPerfil(repo, repoPermissao);
  await casoDeUso.executar(perfilComUmaPermissao);

  const perfil1Salvo = await repo.obterPerfilPorId(novoPerfil.getUuid());
  const permissao = perfil1Salvo?.obterPermissoes.find(
    (p) => p.getUuid() === novaPermissao1.getUuid(),
  );

  expect(permissao?.getUuid()).toEqual(novaPermissao1.getUuid());
  expect(perfil1Salvo?.qtdPermissoes).toBe(1);
});

test("Deve remover uma permissão de um perfil com duas permissões", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const novoPerfil = new Perfil(perfil1);
  novoPerfil.adicionarPermissao(novaPermissao1);
  novoPerfil.adicionarPermissao(novaPermissao2);

  const perfilComUmaPermissao = {
    id: novoPerfil.getUuid(),
    permissoes: [novaPermissao1.getUuid()],
  };
  const repo = new RepositorioPerfilMock([novoPerfil]);
  const repoPermissao = new RepositorioPermissaoMock([
    novaPermissao1,
    novaPermissao2,
  ]);
  const casoDeUso = new EditarPerfil(repo, repoPermissao);
  await casoDeUso.executar(perfilComUmaPermissao);

  const perfil1Salvo = await repo.obterPerfilPorId(novoPerfil.getUuid());
  expect(perfil1Salvo?.qtdPermissoes).toBe(1);
});

test("Deve lançar um erro a tentar alterar um perfil inexistente", async () => {
  const repo = new RepositorioPerfilMock();
  const repoPermissao = new RepositorioPermissaoMock();
  const casoDeUso = new EditarPerfil(repo, repoPermissao);

  expect(async () => {
    await casoDeUso.executar({ id: Id.novo.uuid });
  }).rejects.toThrow("perfil não existe.");
});

test("Deve lançar um erro ao tentar alterar o nome do perfil para um nome já existente", async () => {
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const repo = new RepositorioPerfilMock([novoPerfil1, novoPerfil2]);
  const repoPermissao = new RepositorioPermissaoMock();

  const perfil1AtualizadoNomeIgual = {
    id: novoPerfil2.getUuid(),
    nome: "Admin",
    descricao: "Administrador",
  };

  const casoDeUso = new EditarPerfil(repo, repoPermissao);
  expect(async () => {
    await casoDeUso.executar(perfil1AtualizadoNomeIgual);
  }).rejects.toThrow("já existe perfil com esse nome.");
});
