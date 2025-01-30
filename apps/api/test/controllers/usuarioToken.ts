import RepositorioPermissaoPrismaPg from "@/adapters/database/PermissaoRepositorioPgPrismaAdapter";
import { axiosApi } from "../config";
import RepositorioPerfilPrismaPg from "@/adapters/database/PerfilRepositorioPgPrismaAdapter";
import RepositorioUsuarioPrismaPg from "@/adapters/database/UsuarioRepositorioPgPrismaAdapter";
import conexaoPrismaJest from "./db/ConexaoPrisma";

const usuarioToken = {
  ENDPOINT_LOGIN: "/auth/login",

  data: {
    email: "admin@admin.com",
    senha: "@Admin1",
  },

  async token() {
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
