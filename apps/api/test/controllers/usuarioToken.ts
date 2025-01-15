import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "./db/ConexaoPrisma";

const usuarioToken = {
  ENDPOINT_REGISTRAR: "/auth/registrar-usuario",
  ENDPOINT_LOGIN: "/auth/login",

  data: {
    nome: "Usuario Teste",
    email: "usuariotoken@zmail.com",
    senha: "Abc@123",
    senhaConfirmacao: "Abc@123",
    celular: "+5581922221111",
    ativo: true,
  },

  async token() {
    await axiosApi.post(this.ENDPOINT_REGISTRAR, this.data);
    const login = await axiosApi.post(this.ENDPOINT_LOGIN, {
      email: this.data.email,
      senha: this.data.senha,
    });
    return login.data.tokenId;
  },

  async excluirUsuario() {
    const repoPrisma = new RepositorioPermissaoPrismaPg(conexaoPrismaJest);
    const repoPerfil = new RepositorioPerfilPrismaPg(
      conexaoPrismaJest,
      repoPrisma,
    );
    const repoUsuario = new RepositorioUsuarioPrismaPg(
      conexaoPrismaJest,
      repoPerfil,
    );
    const usuarioSalvo = await repoUsuario.obterPorEmail(this.data.email);
    await repoUsuario.excluirUsuario(`${usuarioSalvo?.getUuid()}`);
  },
};

export default usuarioToken;
