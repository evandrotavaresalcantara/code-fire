import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";
import { UsuarioDTO } from "./ObterUsuarios";
import Perfil from "../../model/Perfil";
import { PerfilDTO } from "../perfil/ObterPerfis";

interface Entrada {
  id: string;
}
type Saida = UsuarioDTO;

export class ObterUsuarioPorId implements CasoDeUso<Entrada, Saida | null> {
  constructor(private readonly repo: RepositorioUsuario) {}

  async executar(entrada: Entrada): Promise<Saida | null> {
    const usuarioBD = await this.repo.obterUsuarioPorId(entrada.id);
    if (!usuarioBD) return null;

    return {
      id: usuarioBD.getUuid(),
      nome: usuarioBD.getNome(),
      email: usuarioBD.getEmail(),
      telefone: usuarioBD.getTelefone() ?? null,
      urlPerfil: usuarioBD.getUrlPerfil() ?? null,
      ativo: usuarioBD.habilitado,
      doisFatores: usuarioBD.getDoisFatores(),
      sisAdmin: usuarioBD.getSisAdmin(),
      perfis: this.paraPerfilDTO(usuarioBD.obterPerfis),
    };
  }

  private paraPerfilDTO(perfis: Perfil[]): PerfilDTO[] {
    return perfis.map((perfil) => ({
      id: perfil.getUuid(),
      nome: perfil.getNomePerfil(),
      descricao: perfil.getDescricaoPerfil(),
    }));
  }
}
