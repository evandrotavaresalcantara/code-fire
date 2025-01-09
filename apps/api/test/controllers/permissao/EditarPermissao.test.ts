import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

test("Deve editar uma permissão existente", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao2",
    descricao: "permissao2-descricao",
  };
  const dataUpdate = {
    nome: "permissao3",
    descricao: "permissao3-descricao",
  };
  await axiosApi.post(ENDPOINT, data);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  const ENDPOINTUPDATE = `${ENDPOINT}/${permissao?.getUuid()}`;

  const response = await axiosApi.put(ENDPOINTUPDATE, dataUpdate);
  await repoPermissao.excluirPermissao(`${permissao?.getUuid()}`);

  expect(response.status).toBe(201);
});
