import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
  obterPerfis(): Promise<Perfil[]>;
  obterPerfilPorId(id: string): Promise<Perfil | undefined>;
  obterPerfilPorPermissaoId(id: string): Promise<Perfil | undefined>;
  obterPerfilPorNome(nome: string): Promise<Perfil | undefined>;
  criarPerfil(perfil: Perfil): Promise<void>;
  editarPerfil(perfil: Perfil): Promise<void>;
  excluirPerfil(id: string): Promise<void>;
}
