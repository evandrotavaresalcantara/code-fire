import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";

const ENDPOINT = "/auth/registrar-usuario";

test("Deve registrar um usuário 201", async () => {
  const data = {
    name: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    password: "Abc@123",
    passwordConfirm: "Abc@123",
    telephone: "+5581922221111",
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(201);

  const repoPrisma = new RepositorioPermissaoPrismaPg();
  const repoPerfil = new RepositorioPerfilPrismaPg(repoPrisma);
  const repoUsuario = new RepositorioUsuarioPrismaPg(repoPerfil);

  const usuarioSalvo = await repoUsuario.obterPorEmail(data.email);
  repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
});
