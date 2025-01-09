import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

test("Deve obter perfis existentes", async () => {
  const ENDPOINT = "/perfis";
  const data1 = {
    nome: "perfil7",
    descricao: "perfil9-descrição",
  };
  const data2 = {
    nome: "perfil8",
    descricao: "perfil10-descrição",
  };
  await axiosApi.post(ENDPOINT, data1);
  await axiosApi.post(ENDPOINT, data2);

  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  const perfil1data = await repoPerfil.obterPerfilPorNome(data1.nome);
  const perfil2data = await repoPerfil.obterPerfilPorNome(data2.nome);

  const response = await axiosApi.get(ENDPOINT);

  await repoPerfil.excluirPerfil(`${perfil1data?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfil2data?.getUuid()}`);

  expect(response.status).toBe(200);
});
