import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { Usuario } from "@packages/auth/src";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/usuarios";
const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
const usuario1 = {
  nomeCompleto: "Usuario Um",
  email: "usuarioum@dev.io",
  telefone: "81911112222",
  senha: hash1,
};
const usuario2 = {
  nomeCompleto: "Usuario Dois",
  email: "usuariodois@dev.io",
  telefone: "81933334444",
  senha: hash1,
  ativo: true,
};
test("Deve obter usuários existentes", async () => {
  const token = await usuarioToken.token();
  const novoUsuario1 = new Usuario(usuario1);
  const novoUsuario2 = new Usuario(usuario2);
  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  await repoUsuario.criarUsuario(novoUsuario1);
  await repoUsuario.criarUsuario(novoUsuario2);

  const response = await axiosApi.get(ENDPOINT, {
    headers: { Authorization: token },
  });

  await repoUsuario.excluirUsuario(novoUsuario1.getUuid());
  await repoUsuario.excluirUsuario(novoUsuario2.getUuid());

  expect(response.status).toBe(200);
});
