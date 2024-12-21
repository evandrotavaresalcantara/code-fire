import { RepositorioUsuario, Usuario } from "@packages/auth/src";

export class RepositorioUsuarioPgPromiseAdapter implements RepositorioUsuario {
  obterUsuarios(): Promise<Usuario[]> {
    throw new Error("Method not implemented.");
  }
  obterUsuarioPorId(id: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  obterUsuarioPorPerfilId(id: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  obterPorEmail(email: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  criarUsuario(usuario: Usuario): Promise<void> {
    throw new Error("Method not implemented.");
  }
  editarUsuario(usuario: Usuario): Promise<void> {
    throw new Error("Method not implemented.");
  }
  excluirUsuario(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
