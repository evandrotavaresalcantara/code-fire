import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/novo-usuario";

test("Deve criar um novo usuário ", async () => {
  const token = await usuarioToken.token();
  const data = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "81922221111",
    ativo: true,
  };
  const response = await axiosApi.post(ENDPOINT, data, {
    headers: { Authorization: token },
  });

  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  const usuarioSalvo = await repoUsuario.obterPorEmail(data.email);
  repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
