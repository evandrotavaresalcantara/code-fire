import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import usuarioToken from "../usuarioToken";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";

const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
const ENDPOINT = "/auth/usuarios";
test("Deve remover um usuário", async () => {
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

  const response = await axiosApi.delete(
    `${ENDPOINT}/${usuarioSalvo?.getUuid()}`,
    {
      headers: { Authorization: token },
    },
  );
  await usuarioToken.excluirUsuario();
  expect(response.status).toBe(201);
});
