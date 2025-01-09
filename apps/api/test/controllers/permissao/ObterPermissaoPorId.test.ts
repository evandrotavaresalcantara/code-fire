import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import { Permissao } from "@packages/auth/src";
import { Id } from "@packages/common";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT = "/permissoes";
test("Deve obter permissão pelo id", async () => {
  const permissao = { nome: "permissao5", descricao: "descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  await repoPermissao.criarPermissao(novaPermissao);

  const response = await axiosApi.get(`${ENDPOINT}/${novaPermissao.getUuid()}`);

  await repoPermissao.excluirPermissao(novaPermissao.getUuid());

  expect(response.status).toBe(200);
});

test("Deve retornar null para id não encotrado", async () => {
  const permissao = { nome: "permissao6", descricao: "descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  await repoPermissao.criarPermissao(novaPermissao);

  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`);
  await repoPermissao.excluirPermissao(novaPermissao.getUuid());

  expect(response.data).toBeNull();
  expect(response.status).toBe(200);
});
