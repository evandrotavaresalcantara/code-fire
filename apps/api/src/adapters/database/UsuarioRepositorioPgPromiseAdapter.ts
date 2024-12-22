import { RepositorioUsuario, Usuario } from "@packages/auth/src";
import { DatabaseConnection } from "./providers";

export class RepositorioUsuarioPgPromiseAdapter implements RepositorioUsuario {
  private conexao: DatabaseConnection;
  private tableUsuario = "usuario";

  constructor(databaseConnection: DatabaseConnection) {
    this.conexao = databaseConnection;
  }

  async obterUsuarios(): Promise<Usuario[]> {
    throw new Error("Method not implemented.");
  }
  async obterUsuarioPorId(id: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  async obterUsuarioPorPerfilId(id: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  async obterPorEmail(email: string): Promise<Usuario | null> {
    throw new Error("Method not implemented.");
  }
  async criarUsuario(usuario: Usuario): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async editarUsuario(usuario: Usuario): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async excluirUsuario(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
