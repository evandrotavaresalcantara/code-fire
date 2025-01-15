import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

test("Deve editar uma permissão existente", async () => {
  const token = await usuarioToken.token();
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao2",
    descricao: "permissao2-descricao",
  };
  const dataUpdate = {
    nome: "permissao3",
    descricao: "permissao3-descricao",
  };
  await axiosApi.post(ENDPOINT, data, { headers: { Authorization: token } });
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  const ENDPOINTUPDATE = `${ENDPOINT}/${permissao?.getUuid()}`;

  const response = await axiosApi.put(ENDPOINTUPDATE, dataUpdate, {
    headers: { Authorization: token },
  });
  await repoPermissao.excluirPermissao(`${permissao?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
