import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";

test("Deve excluir um perfil existente", async () => {
  const ENDPOINT = "/perfis";
  const data = {
    name: "perfil6",
    description: "perfil6-descricao",
  };
  await axiosApi.post(ENDPOINT, data);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  const perfilSalvo = await repoPerfil.obterPerfilPorNome(data.name);

  const response = await axiosApi.delete(
    `${ENDPOINT}/${perfilSalvo?.getUuid()}`,
  );
  expect(response.status).toBe(201);
});
