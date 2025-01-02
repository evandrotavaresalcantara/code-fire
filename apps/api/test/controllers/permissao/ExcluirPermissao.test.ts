import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";

test("Deve excluir uma permissão existente", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    name: "permissao4",
    description: "permissao4-descricao",
  };

  await axiosApi.post(ENDPOINT, data);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const permissao = await repoPermissao.obterPermissaoPorNome(data.name);
  const ENDPOINTDELETE = `${ENDPOINT}/${permissao?.getUuid()}`;
  const response = await axiosApi.delete(ENDPOINTDELETE);
  expect(response.status).toBe(201);
});
