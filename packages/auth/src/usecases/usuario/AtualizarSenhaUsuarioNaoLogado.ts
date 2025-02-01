import { CasoDeUso, EntidadeProps, Id } from "@packages/common";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { ProvedorCriptografia, RepositorioUsuario } from "../../provider";

interface Entrada extends EntidadeProps {
  senhaNova?: string;
  senhaNovaConfirmacao?: string;
}

export default class AtualizarSenhaUsuarioNaoLogado
  implements CasoDeUso<Entrada, void>
{
  constructor(
    private readonly repoUsuario: RepositorioUsuario,
    private readonly provedorCriptografia: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    const id = new Id(entrada.id);

    if (entrada.senhaNova !== entrada.senhaNovaConfirmacao) {
      throw new Error("senha nova e confirmação da senha nova são diferentes.");
    }

    const novaSenha = new SenhaForte(entrada.senhaNova);

    const usuario = await this.repoUsuario.obterUsuarioPorId(id.uuid);
    if (!usuario) throw new Error("usuário não existe.");

    const hashSenhaNova = this.provedorCriptografia.criptografar(
      novaSenha.valor,
    );
    const usuarioSenhaAtualizada = usuario.clonar({ senha: hashSenhaNova });

    await this.repoUsuario.editarUsuario(usuarioSenhaAtualizada);
  }
}
