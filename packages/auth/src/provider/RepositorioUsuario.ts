import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
  obterUsuarios(): Promise<Usuario[]>;
  obterUsuarioPorId(id: string): Promise<Usuario | undefined>;
  obterUsuarioPorTokenRedefinicaoSenha(
    token: string,
  ): Promise<Usuario | undefined>;
  obterUsuarioPorPerfilId(id: string): Promise<Usuario | undefined>;
  obterPorEmail(email: string): Promise<Usuario | undefined>;
  criarUsuario(usuario: Usuario): Promise<void>;
  editarUsuario(usuario: Usuario): Promise<void>;
  excluirUsuario(id: string): Promise<void>;
}
