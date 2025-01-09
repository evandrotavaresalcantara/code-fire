import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT = "/auth/login";

test("Deve realizar o login e receber o token de acesso", async () => {
  const registrarData = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "+5581922221111",
  };
  const loginData = {
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
  };
  await axiosApi.post(ENDPOINT_REGISTRAR, registrarData);

  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  const response = await axiosApi.post(ENDPOINT, loginData);

  const usuarioSalvo = await repoUsuario.obterPorEmail(registrarData.email);
  await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);

  expect(response.status).toBe(200);
});
