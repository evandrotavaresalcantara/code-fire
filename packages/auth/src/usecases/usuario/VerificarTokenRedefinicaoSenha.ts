import { CasoDeUso } from "@packages/common";
import { RepositorioUsuario } from "../../provider";

interface Input {
  token: string;
}

interface Output {
  isValid: boolean;
}

export class VerificarTokenRedefinicaoSenha
  implements CasoDeUso<Input, Output>
{
  constructor(readonly repositorioUsuario: RepositorioUsuario) {}

  async executar(entrada: Input): Promise<Output> {
    const usuario =
      await this.repositorioUsuario.obterUsuarioPorTokenRedefinicaoSenha(
        entrada.token,
      );
    if (!usuario) return { isValid: false };
    const expiracaoToken = usuario.getDataExpiracaoRecuperacaoSenha();
    if (expiracaoToken) {
      if (expiracaoToken.getTime() > new Date().getTime()) {
        usuario.cleanRecuperacaoSenha();
        await this.repositorioUsuario.editarUsuario(usuario);
        return { isValid: true };
      }
    }
    return { isValid: false };
  }
}
