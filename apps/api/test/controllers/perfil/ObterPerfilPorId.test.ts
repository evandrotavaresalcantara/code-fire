import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import { Perfil } from "@packages/auth/src";
import { Id } from "@packages/common";

const ENDPOINT = "/perfis";

test("Deve obter perfil pelo id", async () => {
  const perfil = { nome: "perfil7", descricao: "descricao" };
  const novoPerfil = new Perfil(perfil);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  await repoPerfil.criarPerfil(novoPerfil);

  const response = await axiosApi.get(`${ENDPOINT}/${novoPerfil.getUuid()}`);
  expect(response.status).toBe(200);
  await repoPerfil.excluirPerfil(novoPerfil.getUuid());
});

test("Deve retornar null para id não encotrado", async () => {
  const permissao = { nome: "perfil8", descricao: "descricao" };
  const novoPerfil = new Perfil(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPermissao);
  await repoPerfil.criarPerfil(novoPerfil);

  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`);
  expect(response.status).toBe(200);
  expect(response.data).toBeNull();
  await repoPerfil.excluirPerfil(novoPerfil.getUuid());
});
