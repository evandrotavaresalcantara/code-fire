import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";

test("Deve obter permissões existentes", async () => {
  const ENDPOINT = "/permissoes";
  const data1 = {
    name: "editar",
    description: "edição",
  };
  const data2 = {
    name: "vizualizar",
    description: "vizualização",
  };
  await axiosApi.post(ENDPOINT, data1);
  await axiosApi.post(ENDPOINT, data2);

  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const permissao1data = await repoPermissao.obterPermissaoPorNome(data1.name);
  const permissao2data = await repoPermissao.obterPermissaoPorNome(data2.name);

  const response = await axiosApi.get(ENDPOINT);
  expect(response.status).toBe(200);

  await repoPermissao.excluirPermissao(`${permissao1data?.getUuid()}`);
  await repoPermissao.excluirPermissao(`${permissao2data?.getUuid()}`);
});
