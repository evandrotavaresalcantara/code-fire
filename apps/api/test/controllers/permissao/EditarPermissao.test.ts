import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";

test("Deve editar uma permissão existente", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    name: "permissao2",
    description: "permissao2-descricao",
  };
  const dataUpdate = {
    name: "permissao3",
    description: "permissao3-descricao",
  };
  await axiosApi.post(ENDPOINT, data);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const permissao = await repoPermissao.obterPermissaoPorNome(data.name);
  const ENDPOINTUPDATE = `${ENDPOINT}/${permissao?.getUuid()}`;

  const response = await axiosApi.put(ENDPOINTUPDATE, dataUpdate);
  expect(response.status).toBe(201);
  await repoPermissao.excluirPermissao(`${permissao?.getUuid()}`);
});
