import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/alterar-senha";
const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
test("Deve editar um usuário ", async () => {
  const token = await usuarioToken.token();
  const usuario = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "81922221111",
    ativo: true,
  };
  const data = {
    senhaAntiga: "Abc@123",
    senhaNova: "Abc@1234567",
    senhaNovaConfirmacao: "Abc@1234567",
  };

  const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPrisma,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  await axiosApi.post(ENDPOINT_REGISTRAR, usuario, {
    headers: { Authorization: token },
  });
  const usuarioSalvo = await repoUsuario.obterPorEmail(usuario.email);

  const response = await axiosApi.put(
    `${ENDPOINT}/${usuarioSalvo?.getUuid()}`,
    data,
    {
      headers: { Authorization: token },
    },
  );

  repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
});
