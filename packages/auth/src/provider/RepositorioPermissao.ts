import Permissao from "../model/Permissao";

export default interface RepositorioPermissao {
  obterPermissoes(): Promise<Permissao[]>;
  obterPermissaoPorId(id: string): Promise<Permissao | undefined>;
  obterPermissaoPorNome(nome: string): Promise<Permissao | undefined>;
  criarPermissao(permissao: Permissao): Promise<void>;
  editarPermissao(permissao: Permissao): Promise<void>;
  excluirPermissao(id: string): Promise<void>;
}
