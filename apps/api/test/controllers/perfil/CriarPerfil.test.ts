import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { Permissao } from "@packages/auth/src";

const ENDPOINT = "/perfis";

test("Deve criar um novo perfil sem permissão", async () => {
  const data = {
    name: "perfil1",
    description: "perfil1-descricao",
    active: true,
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(201);

  const repoPerfil = new RepositorioPerfilPrismaPg(
    new RepositorioPermissaoPrismaPg(),
  );
  const perfil = await repoPerfil.obterPerfilPorNome(data.name);
  if (perfil) await repoPerfil.excluirPerfil(perfil.getUuid());
});

test("Deve criar um novo perfil com uma permissão", async () => {
  const permissao = { nome: "permissao9", descricao: "permissao9-descricao" };
  const novaPermissao = new Permissao(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  await repoPermissao.criarPermissao(novaPermissao);

  const ENDPOINT = "/perfis";
  const data = {
    name: "perfil2",
    description: "perfil2-descrição",
    active: true,
    permissions: [novaPermissao.getUuid()],
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(201);

  const perfil = await repoPerfil.obterPerfilPorNome(data.name);
  await repoPermissao.excluirPermissao(novaPermissao.getUuid());
  await repoPerfil.excluirPerfil(`${perfil?.getUuid()}`);
});
