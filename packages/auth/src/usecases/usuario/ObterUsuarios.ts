import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";
import { PerfilDTO } from "../perfil";

export interface UsuarioDTO {
  id?: string;
  nome?: string;
  email?: string;
  urlPerfil?: string | null;
  ativo?: boolean;
  celular?: string | null;
  perfis?: PerfilDTO[];
}

export class ObterUsuarios implements CasoDeUso<void, UsuarioDTO[]> {
  constructor(private repositorioUsuario: RepositorioUsuario) {}

  async executar(): Promise<UsuarioDTO[]> {
    const usuariosBD = await this.repositorioUsuario.obterUsuarios();

    return usuariosBD.map((usuario) => {
      return {
        id: usuario.getUuid(),
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        celular: usuario.getCelular() ?? null,
        urlPerfil: usuario.getUrlPerfil() ?? null,
        ativo: usuario.habilitado,
        perfis: [],
      };
    });
  }
}
