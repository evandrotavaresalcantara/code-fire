import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

test("Deve excluir uma permissão existente", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao4",
    descricao: "permissao4-descricao",
  };

  await axiosApi.post(ENDPOINT, data);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  const ENDPOINTDELETE = `${ENDPOINT}/${permissao?.getUuid()}`;
  const response = await axiosApi.delete(ENDPOINTDELETE);

  expect(response.status).toBe(201);
});
