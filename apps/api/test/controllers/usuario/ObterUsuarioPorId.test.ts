import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { Usuario } from "@packages/auth/src";
import { Id } from "@packages/common";

const ENDPOINT = "/usuarios";
const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";

test("Deve obter usuário pelo id", async () => {
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    celular: "81911112222",
    senha: hash1,
  };

  const novoUsuario = new Usuario(usuario);
  const repoPrisma = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPrisma);
  const repoUsuario = new RepositorioUsuarioPrismaPg(repoPerfil);

  await repoUsuario.criarUsuario(novoUsuario);

  const response = await axiosApi.get(`${ENDPOINT}/${novoUsuario.getUuid()}`);
  expect(response.status).toBe(200);
  await repoUsuario.excluirUsuario(novoUsuario.getUuid());
});

test("Deve retornar null para id não encotrado", async () => {
  const usuario = {
    nomeCompleto: "Usuario Um",
    email: "usuarioum@dev.io",
    celular: "81911112222",
    senha: hash1,
  };

  const novoUsuario = new Usuario(usuario);
  const repoPrisma = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPrisma);
  const repoUsuario = new RepositorioUsuarioPrismaPg(repoPerfil);

  await repoUsuario.criarUsuario(novoUsuario);

  const response = await axiosApi.get(`${ENDPOINT}/${Id.novo.uuid}`);
  expect(response.status).toBe(200);
  expect(response.data).toBeNull();
  await repoUsuario.excluirUsuario(novoUsuario.getUuid());
});
