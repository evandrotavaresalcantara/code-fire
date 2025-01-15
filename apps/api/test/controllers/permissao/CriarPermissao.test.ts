import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

test("Deve criar uma nova permissão", async () => {
  const token = await usuarioToken.token();
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao1",
    descricao: "descricao",
  };
  const response = await axiosApi.post(ENDPOINT, data, {
    headers: { Authorization: token },
  });

  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  await repoPermissao.excluirPermissao(`${permissao?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
