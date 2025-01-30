import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import { axiosApi } from "../../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { Perfil } from "@packages/auth/src";
import conexaoPrismaJest from "../db/ConexaoPrisma";
import usuarioToken from "../usuarioToken";

const ENDPOINT_REGISTRAR_USUARIO = "/auth/registrar-usuario";
const ENDPOINT_ATUALIZAR_PERFIL = "/auth/atualizar-perfil";

test("Deve atualizar o perfil do usuário", async () => {
  const token = await usuarioToken.token();
  const repoPermissao = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
  const repoPerfil = new RepositorioPerfilPrismaPg(
    conexaoPrismaJest,
    repoPermissao,
  );
  const repoUsuario = new RepositorioUsuarioPrismaPg(
    conexaoPrismaJest,
    repoPerfil,
  );

  const usuarioData = {
    nome: "Usuario Teste",
    email: "usuarioteste@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    telefone: "81922221111",
  };
  await axiosApi.post(ENDPOINT_REGISTRAR_USUARIO, usuarioData, {
    headers: { Authorization: token },
  });

  const perfil1 = {
    nome: "perfil1",
    descricao: "descricao",
  };
  const perfil2 = {
    nome: "perfil2",
    descricao: "descricao",
  };

  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  await repoPerfil.criarPerfil(novoPerfil1);
  await repoPerfil.criarPerfil(novoPerfil2);
  const perfil1Salvo = await repoPerfil.obterPerfilPorNome(perfil1.nome);
  const perfil2Salvo = await repoPerfil.obterPerfilPorNome(perfil2.nome);
  const usuarioSalvo = await repoUsuario.obterPorEmail(usuarioData.email);
  const data = {
    perfis: [`${perfil1Salvo?.getUuid()}`, `${perfil2Salvo?.getUuid()}`],
  };

  const response = await axiosApi.put(
    `${ENDPOINT_ATUALIZAR_PERFIL}/${usuarioSalvo?.getUuid()}`,
    data,
    { headers: { Authorization: token } },
  );

  await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfil1Salvo?.getUuid()}`);
  await repoPerfil.excluirPerfil(`${perfil2Salvo?.getUuid()}`);

  expect(response.status).toBe(201);
});
