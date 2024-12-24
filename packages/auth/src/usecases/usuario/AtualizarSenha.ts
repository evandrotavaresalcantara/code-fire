import { CasoDeUso, EntidadeProps, Id } from "common";
import SenhaForte from "../../model/obj-valor/SenhaForte";
import { ProvedorCriptografia, RepositorioUsuario } from "../../provider";

interface Entrada extends EntidadeProps {
  senhaAntiga?: string;
  senhaNova?: string;
  senhaNovaConfirmacao?: string;
}

export default class AtualizarSenha implements CasoDeUso<Entrada, void> {
  constructor(
    private readonly repoUsuario: RepositorioUsuario,
    private readonly provedorCriptografia: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    const id = new Id(entrada.id);
    if (!entrada.senhaAntiga) throw new Error("email ou senha incorreto.");

    if (entrada.senhaNova !== entrada.senhaNovaConfirmacao) {
      throw new Error("senha nova e confirmação da senha nova são diferentes.");
    }

    const novaSenha = new SenhaForte(entrada.senhaNova);

    const usuario = await this.repoUsuario.obterUsuarioPorId(id.uuid);
    if (!usuario) throw new Error("usuário não existe.");

    const hashSenha = usuario.getSenha();
    if (!hashSenha) throw new Error("usuário inativo.");

    const senhaAtualConfirmada = this.provedorCriptografia.comparar(
      entrada.senhaAntiga,
      hashSenha,
    );

    if (!senhaAtualConfirmada) throw new Error("email ou senha incorreto.");

    const hashSenhaNova = this.provedorCriptografia.criptografar(
      novaSenha.valor,
    );
    const usuarioSenhaAtualizada = usuario.clonar({ senha: hashSenhaNova });

    await this.repoUsuario.editarUsuario(usuarioSenhaAtualizada);
  }
}
