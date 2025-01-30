import { AuthToken, RepositorioUsuario } from "@packages/auth/src";
import { NextFunction, Request, Response } from "express";

interface idToken {
  id: string;
  nome: string;
  email: string;
  iat: number;
  exp: number;
}

export default function UsuarioCookiesMiddleware(
  repositorioUsuario: RepositorioUsuario,
  provedorToken: AuthToken,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () =>
      res.status(401).json({ message: "token inválido." });
    try {
      const token = req.cookies.tokenId;
      if (!token) {
        res.status(401).json({ message: "não autorizado" });
        return;
      }
      if (!provedorToken.verify(token)) {
        acessoNegado();
        return;
      }
      const payloadToken = provedorToken.decode(token) as idToken;
      const usuario = await repositorioUsuario.obterUsuarioPorId(
        payloadToken.id,
      );
      if (!usuario?.habilitado || !usuario?.getTokenReFreshToken()) {
        res.status(403).json({ message: "token inválido." });
        return;
      }
      if (!usuario.getSisAdmin()) {
        acessoNegado();
        return;
      }
      next();
    } catch {
      acessoNegado();
    }
  };
}
