import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

test("Deve excluir um perfil existente", async () => {
  const token = await usuarioToken.token();
  const ENDPOINT = "/perfis";
  const data = {
    nome: "perfil6",
    descricao: "perfil6-descricao",
  };
  await axiosApi.post(ENDPOINT, data, { headers: { Authorization: token } });
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  const perfilSalvo = await repoPerfil.obterPerfilPorNome(data.nome);
  const response = await axiosApi.delete(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
    { headers: { Authorization: token } },
  );
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
