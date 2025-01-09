import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import conexaoPrismaJest from "../db/ConexaoPrisma";

test("Deve obter permissões existentes", async () => {
  const ENDPOINT = "/permissoes";
  const data1 = {
    nome: "permissao7",
    descricao: "descricao",
  };
  const data2 = {
    nome: "permissao8",
    descricao: "descricao",
  };
  await axiosApi.post(ENDPOINT, data1);
  await axiosApi.post(ENDPOINT, data2);

  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao1data = await repoPermissao.obterPermissaoPorNome(data1.nome);
  const permissao2data = await repoPermissao.obterPermissaoPorNome(data2.nome);

  const response = await axiosApi.get(ENDPOINT);

  await repoPermissao.excluirPermissao(`${permissao1data?.getUuid()}`);
  await repoPermissao.excluirPermissao(`${permissao2data?.getUuid()}`);

  expect(response.status).toBe(200);
});
