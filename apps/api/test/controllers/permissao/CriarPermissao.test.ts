import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";

test("Deve criar uma nova permissão", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "editar",
    descricao: "edição",
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(201);

  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const permissao = await repoPermissao.obterPermissaoPorNome(data.nome);
  if (permissao) await repoPermissao.excluirPermissao(permissao.getUuid());
});
