import { CasoDeUso } from "@packages/common";
import { AuthToken, RepositorioUsuario } from "../../provider";

interface Input {
  token?: string;
  tokenId?: string;
}

interface Output {
  token: string;
  tokenId: string;
}

export class AtualizarAccessRefreshTokens
  implements CasoDeUso<Input, Output | null>
{
  constructor(
    readonly repositorioUsuario: RepositorioUsuario,
    readonly authToken: AuthToken,
  ) {}

  async executar(entrada: Input): Promise<null | Output> {
    const isValidToken = this.authToken.verify(entrada.token);
    if (!isValidToken) return null;
    const payloadToken = this.authToken.decode(entrada.token ?? "") as {
      id: string;
      iat: number;
      exp: number;
    };
    // TODO: Verificar se ira manter o tokenId
    if (payloadToken.id !== entrada.tokenId) return null;
    const payloadTokenId = this.authToken.decode(entrada.tokenId) as {
      id: string;
      nome: string;
      email: string;
      urlPerfil: string;
      isSisAdmin: boolean;
      perfis: string[];
      iat: number;
      exp: number;
    };
    const usuario = await this.repositorioUsuario.obterUsuarioPorId(
      payloadTokenId.id,
    );
    if (!usuario) return null;
    if (usuario.getTokenReFreshToken() !== entrada.token) return null;
    const payloadId = {
      id: usuario.getUuid(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      urlPerfil: usuario.getUrlPerfil(),
      isSisAdmin: usuario.getSisAdmin(),
      perfis: usuario.obterPerfis,
    };
    const tokenId = this.authToken.create(payloadId, "15m");
    const payloadRefresh = { id: tokenId };
    const token = this.authToken.create(payloadRefresh, "30d");
    usuario.setTokenReFreshToken(token);
    await this.repositorioUsuario.editarUsuario(usuario);
    return { tokenId, token };
  }
}
