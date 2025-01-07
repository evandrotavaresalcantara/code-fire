import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";

test("Deve obter perfis existentes", async () => {
  const ENDPOINT = "/perfis";
  const data1 = {
    name: "perfil7",
    description: "perfil9-descrição",
  };
  const data2 = {
    name: "perfil8",
    description: "perfil10-descrição",
  };
  await axiosApi.post(ENDPOINT, data1);
  await axiosApi.post(ENDPOINT, data2);

  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  const perfil1data = await repoPerfil.obterPerfilPorNome(data1.name);
  const perfil2data = await repoPerfil.obterPerfilPorNome(data2.name);

  const response = await axiosApi.get(ENDPOINT);
  expect(response.status).toBe(200);

  await repoPerfil.excluirPerfil(`${perfil1data?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfil2data?.getUuid()}`);
});
