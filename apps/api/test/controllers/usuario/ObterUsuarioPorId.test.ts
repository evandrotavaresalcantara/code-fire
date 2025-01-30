import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { Usuario } from "@packages/auth/src";
import { Id } from "@packages/common";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/usuarios";
const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";

test("Deve obter usuário pelo id", async () => {
  const token = await usuarioToken.token();
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    telefone: "81911112222",
    senha: hash1,
  };

  const novoUsuario = new Usuario(usuario);
  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  await repoUsuario.criarUsuario(novoUsuario);

  const response = await axiosApi.get(`${ENDPOINT}/${novoUsuario.getUuid()}`, {
    headers: { Authorization: token },
  });
  await repoUsuario.excluirUsuario(novoUsuario.getUuid());

  expect(response.status).toBe(200);
});

test("Deve retornar null para id não encotrado", async () => {
  const token = await usuarioToken.token();
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    telefone: "81911112222",
    senha: hash1,
  };

  const novoUsuario = new Usuario(usuario);
  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  await repoUsuario.criarUsuario(novoUsuario);
  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`, {
    headers: { Authorization: token },
  });
  await repoUsuario.excluirUsuario(novoUsuario.getUuid());

  expect(response.status).toBe(200);
  expect(response.data).toBeNull();
});
