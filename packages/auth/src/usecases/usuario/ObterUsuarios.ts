import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";
import { PerfilDTO } from "../perfil";

export interface UsuarioDTO {
  id?: string;
  nome?: string;
  email?: string;
  urlPerfil?: string | null;
  ativo?: boolean;
  telefone?: string | null;
  doisFatores?: boolean;
  sisAdmin?: boolean;
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
        telefone: usuario.getTelefone() ?? null,
        urlPerfil: usuario.getUrlPerfil() ?? null,
        ativo: usuario.habilitado,
        doisFatores: usuario.getDoisFatores(),
        sisAdmin: usuario.getSisAdmin(),
        perfis: [],
      };
    });
  }
}
