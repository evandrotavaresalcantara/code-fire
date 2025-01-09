import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT = "/auth/registrar-usuario";

test("Deve registrar um usuário 201", async () => {
  const data = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "+5581922221111",
  };
  const response = await axiosApi.post(ENDPOINT, data);

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

  expect(response.status).toBe(201);
});
