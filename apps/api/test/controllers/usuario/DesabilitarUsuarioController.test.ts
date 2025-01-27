import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import usuarioToken from "../usuarioToken";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT = "/auth/desabilitar-usuario";
test("Deve Desabilitar um usuário habilitado", async () => {
  const token = await usuarioToken.token();
  const registrarData = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "81922221111",
    ativo: true,
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

  const usuarioSalvo = await repoUsuario.obterPorEmail(registrarData.email);

  const response = await axiosApi.put(
    `${ENDPOINT}/${usuarioSalvo?.getUuid()}`,
    null,
    {
      headers: { Authorization: token },
    },
  );

  await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
