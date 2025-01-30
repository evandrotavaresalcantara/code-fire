import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT_LOGIN = "/auth/login";
const ENDPOINT = "/auth/logout";
test("Deve realizar o logout do usuário", async () => {
  const registrarData = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    celular: "81922221111",
    ativo: true,
  };

  await axiosApi.post(ENDPOINT_REGISTRAR, registrarData);
  const responseLogin = await axiosApi.post(ENDPOINT_LOGIN, {
    email: registrarData.email,
    senha: registrarData.senha,
  });
  const token = responseLogin.data.tokenId;

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

  const data = { userId: usuarioSalvo?.getUuid() };
  const response = await axiosApi.post(ENDPOINT, data, {
    headers: { Authorization: token, cookie: `tokenId=${token}` },
  });

  await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  expect(response.status).toBe(201);
});
