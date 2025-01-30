import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { Permissao } from "@packages/auth/src";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/perfis";
test("Deve criar um novo perfil sem permissão", async () => {
  const token = await usuarioToken.token();
  const data = {
    nome: "perfil1",
    descricao: "perfil1-descricao",
    ativo: true,
  };

  const response = await axiosApi.post(ENDPOINT, data, {
    headers: { Authorization: token },
  });
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    new RepositorioPermissaoPrismaPg(conexaoPrismaJest),
  );
  const perfil = await repoPerfil.obterPerfilPorNome(data.nome);
  if (perfil) await repoPerfil.excluirPerfil(perfil.getUuid());

  expect(response.status).toBe(201);
});

test("Deve criar um novo perfil com uma permissão", async () => {
  const token = await usuarioToken.token();
  const permissao = { nome: "permissao9", descricao: "permissao9-descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  await repoPermissao.criarPermissao(novaPermissao);

  const ENDPOINT = "/perfis";
  const data = {
    nome: "perfil2",
    descricao: "perfil2-descrição",
    ativo: true,
    permissoes: [novaPermissao.getUuid()],
  };
  const response = await axiosApi.post(ENDPOINT, data, {
    headers: {
      Authorization: token,
    },
  });
  const perfil = await repoPerfil.obterPerfilPorNome(data.nome);
  await repoPermissao.excluirPermissao(novaPermissao.getUuid());
  await repoPerfil.excluirPerfil(`${perfil?.getUuid()}`);

  expect(response.status).toBe(201);
});
