import { CasoDeUso } from "@packages/common";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { ProvedorCriptografia, RepositorioUsuario } from "../../provider";

interface Entrada {
  token?: string;
  senhaNova?: string;
  senhaNovaConfirmacao?: string;
}

export default class AtualizarSenhaPeloEmailToken
  implements CasoDeUso<Entrada, void>
{
  constructor(
    private readonly repoUsuario: RepositorioUsuario,
    private readonly provedorCriptografia: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    if (!entrada.token) throw new Error("Dados Inválidos: token incorreto.");
    if (entrada.senhaNova !== entrada.senhaNovaConfirmacao) {
      throw new Error(
        "Dados Inválidos: senha nova e confirmação da senha nova são diferentes.",
      );
    }
    const novaSenha = new SenhaForte(entrada.senhaNova);
    const usuario = await this.repoUsuario.obterUsuarioPorTokenRedefinicaoSenha(
      entrada.token,
    );
    if (!usuario) throw new Error("Dados Inválidos: usuário não existe.");
    const hashSenha = usuario.getSenha();
    if (!hashSenha) throw new Error("Não Autorizado: usuário inativo.");
    const hashSenhaNova = this.provedorCriptografia.criptografar(
      novaSenha.valor,
    );
    const usuarioSenhaAtualizada = usuario.clonar({ senha: hashSenhaNova });
    usuarioSenhaAtualizada.cleanRecuperacaoSenha();
    await this.repoUsuario.editarUsuario(usuarioSenhaAtualizada);
  }
}
