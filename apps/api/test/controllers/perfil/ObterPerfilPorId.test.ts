import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import { Perfil } from "@packages/auth/src";
import { Id } from "@packages/common";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/perfis";

test("Deve obter perfil pelo id", async () => {
  const token = await usuarioToken.token();
  const perfil = { nome: "perfil7", descricao: "descricao" };
  const novoPerfil = new Perfil(perfil);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  await repoPerfil.criarPerfil(novoPerfil);

  const response = await axiosApi.get(`${ENDPOINT}/${novoPerfil.getUuid()}`, {
    headers: { Authorization: token },
  });
  await repoPerfil.excluirPerfil(novoPerfil.getUuid());

  expect(response.status).toBe(200);
});

test("Deve retornar null para id não encotrado", async () => {
  const token = await usuarioToken.token();
  const permissao = { nome: "perfil8", descricao: "descricao" };
  const novoPerfil = new Perfil(permissao);
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  await repoPerfil.criarPerfil(novoPerfil);

  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`, {
    headers: { Authorization: token },
  });
  await repoPerfil.excluirPerfil(novoPerfil.getUuid());

  expect(response.data).toBeNull();
  expect(response.status).toBe(200);
});
