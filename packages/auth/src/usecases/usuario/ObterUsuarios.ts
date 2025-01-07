import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";
import { PerfilDTO } from "../perfil";

export interface UsuarioDTO {
  id?: string;
  nome?: string;
  email?: string;
  urlPerfil?: string;
  ativo?: boolean;
  perfis?: PerfilDTO[];
}

export class ObterUsuarios implements CasoDeUso<void, UsuarioDTO[]> {
  constructor(private repositorioUsuario: RepositorioUsuario) {}

  async executar(): Promise<UsuarioDTO[]> {
    const usuariosBD = await this.repositorioUsuario.obterUsuarios();

    return usuariosBD.map((usuario) => ({
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      urlPerfil: usuario.getUrlPerfil(),
      ativo: usuario.habilitado,
      perfis: [],
    }));
  }
}
