import { Queue } from "@packages/queue/src";
import { CasoDeUso } from "@packages/common";
import { QueuesAuth } from "../../constants";
import { RepositorioUsuario } from "../../provider";

interface Input {
  email: string;
  baseUrl: string;
}

export class RedefinirSenhaPorEmail implements CasoDeUso<Input, void> {
  constructor(
    readonly repositorioUsuario: RepositorioUsuario,
    readonly queue: Queue,
  ) {}

  async executar(entrada: Input): Promise<void> {
    const usuario = await this.repositorioUsuario.obterPorEmail(entrada.email);
    if (usuario) {
      const tokenRedefinicaoSenha = usuario.setRecuperacaoSenha();
      const msg = {
        de: "noreply@security.com.br",
        para: usuario.getEmail(),
        assunto: "Redefinição de Senha",
        corpo: `Link para redefinição de senha: ${entrada.baseUrl}/${tokenRedefinicaoSenha}`,
      };
      await this.queue.publish<{
        de: string;
        para: string;
        assunto: string;
        corpo: string;
        isHtml?: boolean;
        isTest?: boolean;
      }>(QueuesAuth.AUTH_SENHA_ESQUECIDA, msg);
    }
  }
}
