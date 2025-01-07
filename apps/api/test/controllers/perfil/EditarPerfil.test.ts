import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { Perfil, Permissao } from "@packages/auth/src";

test("Deve editar um perfil existente", async () => {
  const ENDPOINT = "/perfis";
  const perfil = {
    nome: "perfil3",
    descricao: "perfil3-descrição",
    ativo: true,
  };
  const data = {
    name: "perfil4",
    description: "perfil4-descrição",
    active: true,
  };
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  const novoPerfil = new Perfil(perfil);
  await repoPerfil.criarPerfil(novoPerfil);
  const perfilSalvo = await repoPerfil.obterPerfilPorNome(perfil.nome);

  const response = await axiosApi.put(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
    data,
  );

  expect(response.status).toBe(201);
  await repoPerfil.excluirPerfil(`${perfilSalvo?.getUuid()}`);
});

test("Deve editar as permissões de perfil existente", async () => {
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);

  const permissao1 = {
    nome: "permissao10",
    descricao: "permissao10-descricao",
  };
  const permissao2 = {
    nome: "permissao11",
    descricao: "permissao11-descricao",
  };
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  await repoPermissao.criarPermissao(novaPermissao1);
  await repoPermissao.criarPermissao(novaPermissao2);
  const permissaoSalva1 = await repoPermissao.obterPermissaoPorNome(
    permissao1.nome,
  );
  const permissaoSalva2 = await repoPermissao.obterPermissaoPorNome(
    permissao2.nome,
  );

  const perfil = {
    nome: "perfil5",
    descricao: "perfil5-descrição",
  };
  const novoPerfil = new Perfil(perfil);
  if (permissaoSalva1) novoPerfil.adicionarPermissao(permissaoSalva1);
  await repoPerfil.criarPerfil(novoPerfil);
  const perfilSalvo = await repoPerfil.obterPerfilPorNome(perfil.nome);

  const ENDPOINT = "/perfis";
  const data = {
    name: "perfil5",
    description: "perfil5-descrição",
    active: true,
    permissions: [
      `${permissaoSalva1?.getUuid()}`,
      `${permissaoSalva2?.getUuid()}`,
    ],
  };
  const response = await axiosApi.put(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
    data,
  );
  expect(response.status).toBe(201);

  await repoPermissao.excluirPermissao(`${permissaoSalva1?.getUuid()}`);
  await repoPermissao.excluirPermissao(`${permissaoSalva2?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfilSalvo?.getUuid()}`);
});
