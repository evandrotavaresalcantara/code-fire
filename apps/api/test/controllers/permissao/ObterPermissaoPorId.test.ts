import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import { Permissao } from "@packages/auth/src";
import { Id } from "@packages/common";

const ENDPOINT = "/permissoes";

test("Deve obter permissão pelo id", async () => {
  const permissao = { nome: "permissao5", descricao: "descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  await repoPermissao.criarPermissao(novaPermissao);

  const response = await axiosApi.get(`${ENDPOINT}/${novaPermissao.getUuid()}`);
  expect(response.status).toBe(200);
  await repoPermissao.excluirPermissao(novaPermissao.getUuid());
});

test("Deve retornar null para id não encotrado", async () => {
  const permissao = { nome: "permissao6", descricao: "descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  await repoPermissao.criarPermissao(novaPermissao);

  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`);
  expect(response.status).toBe(200);
  expect(response.data).toBeNull();
  await repoPermissao.excluirPermissao(novaPermissao.getUuid());
});
