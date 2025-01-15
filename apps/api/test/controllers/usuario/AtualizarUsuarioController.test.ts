import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/atualizar-usuario";
const ENDPOINT_REGISTRAR = "/auth/registrar-usuario";
test("Deve editar um usuário ", async () => {
  const token = await usuarioToken.token();
  const usuario = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "+5581922221111",
    ativo: true,
  };
  const data = {
    nome: "Usuario Atualizado",
    telefone: "+5581933334444",
    urlPerfil: "http://github.com/dev.png",
    email: "usuariotesteup@zmail.com",
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

  const usuarioAtualizado = await repoUsuario.obterPorEmail(data.email);
  repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  await usuarioToken.excluirUsuario();

  expect(response.status).toBe(201);
  expect(usuarioAtualizado?.getNome()).toBe(data.nome);
  expect(usuarioAtualizado?.getUrlPerfil()).toBe(data.urlPerfil);
});
