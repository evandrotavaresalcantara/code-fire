import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { Perfil, Permissao } from "@packages/auth/src";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

test("Deve editar um perfil existente", async () => {
  const token = await usuarioToken.token();
  const ENDPOINT = "/perfis";
  const perfil = {
    nome: "perfil3",
    descricao: "perfil3-descrição",
    ativo: true,
  };
  const data = {
    nome: "perfil4",
    descricao: "perfil4-descrição",
    ativo: true,
  };
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  const novoPerfil = new Perfil(perfil);
  await repoPerfil.criarPerfil(novoPerfil);
  const perfilSalvo = await repoPerfil.obterPerfilPorNome(perfil.nome);

  const response = await axiosApi.put(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
    data,
    { headers: { Authorization: token } },
  );
  await repoPerfil.excluirPerfil(`${perfilSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});

test("Deve editar as permissões de perfil existente", async () => {
  const token = await usuarioToken.token();
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );

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
    nome: "perfil5",
    descricao: "perfil5-descrição",
    ativo: true,
    permissoes: [
      `${permissaoSalva1?.getUuid()}`,
      `${permissaoSalva2?.getUuid()}`,
    ],
  };
  const response = await axiosApi.put(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
    data,
    { headers: { Authorization: token } },
  );
  await repoPermissao.excluirPermissao(`${permissaoSalva1?.getUuid()}`);
  await repoPermissao.excluirPermissao(`${permissaoSalva2?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfilSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
