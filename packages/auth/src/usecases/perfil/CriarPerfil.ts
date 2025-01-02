import { CasoDeUso, EntidadeProps } from "@packages/common";
import { Perfil } from "../../model";
import { RepositorioPerfil, RepositorioPermissao } from "../../provider";

interface Entrada extends EntidadeProps {
  nome?: string;
  descricao?: string;
  ativo?: boolean;
  permissoes?: string[];
}

export default class CriarPerfil implements CasoDeUso<Entrada, void> {
  constructor(
    private repoPerfil: RepositorioPerfil,
    private repoPermissao: RepositorioPermissao,
  ) {}
  async executar(entrada: Entrada): Promise<void> {
    const permissoes = entrada.permissoes || [];
    const novoPerfil = new Perfil(entrada);

    const existePerfil = await this.repoPerfil.obterPerfilPorNome(
      novoPerfil.getNomePerfil(),
    );
    if (existePerfil) throw new Error("perfil já existe.");
    for (const permissao of permissoes) {
      const permissaoBD = await this.repoPermissao.obterPermissaoPorId(
        permissao,
      );
      if (permissaoBD) novoPerfil.adicionarPermissao(permissaoBD);
    }
    await this.repoPerfil.criarPerfil(novoPerfil);
  }
}
