import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

test("Deve excluir uma permissão existente", async () => {
  const token = await usuarioToken.token();
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao4",
    descricao: "permissao4-descricao",
  };

  await axiosApi.post(ENDPOINT, data, { headers: { Authorization: token } });
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  const ENDPOINTDELETE = `${ENDPOINT}/${permissao?.getUuid()}`;
  const response = await axiosApi.delete(ENDPOINTDELETE, {
    headers: { Authorization: token },
  });

  expect(response.status).toBe(201);
});
