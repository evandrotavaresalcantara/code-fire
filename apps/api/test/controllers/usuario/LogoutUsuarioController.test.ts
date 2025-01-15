import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import usuarioToken from "../usuarioToken";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT_LOGIN = "/auth/login";
const ENDPOINT = "/auth/logout";
test("Deve realizar o logout do usuário", async () => {
  const token = await usuarioToken.token();
  const registrarData = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    celular: "+5581922221111",
    ativo: true,
  };

  await axiosApi.post(ENDPOINT_REGISTRAR, registrarData);
  await axiosApi.post(ENDPOINT_LOGIN, {
    email: registrarData.email,
    senha: registrarData.senha,
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

  const usuarioSalvo = await repoUsuario.obterPorEmail(registrarData.email);

  const response = await axiosApi.put(
    `${ENDPOINT}/${usuarioSalvo?.getUuid()}`,
    null,
    {
      headers: { Authorization: token },
    },
  );
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
