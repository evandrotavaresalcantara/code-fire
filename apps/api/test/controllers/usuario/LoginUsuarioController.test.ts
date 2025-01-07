import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT = "/auth/login";

test("Deve realizar o login e receber o token de acesso", async () => {
  const registrarData = {
    name: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    password: "Abc@123",
    passwordConfirm: "Abc@123",
    telephone: "+5581922221111",
  };
  const loginData = {
    email: "usuarioteste@zmail.com",
    password: "Abc@123",
  };
  await axiosApi.post(ENDPOINT_REGISTRAR, registrarData);

  const repoPrisma = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPrisma);
  const repoUsuario = new RepositorioUsuarioPrismaPg(repoPerfil);

  const response = await axiosApi.post(ENDPOINT, loginData);
  expect(response.status).toBe(200);

  const usuarioSalvo = await repoUsuario.obterPorEmail(registrarData.email);
  await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
});
