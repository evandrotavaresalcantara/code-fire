import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

test("Deve criar uma nova permissão", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissao1",
    descricao: "descricao",
  };
  const response = await axiosApi.post(ENDPOINT, data);

  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  await repoPermissao.excluirPermissao(`${permissao?.getUuid()}`);

  expect(response.status).toBe(201);
});
