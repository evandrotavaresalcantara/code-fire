import { AuthToken, RepositorioUsuario } from "@packages/auth/src";
import { Request, Response, NextFunction } from "express";

interface idToken {
  id: string;
}

export default function UsuarioMiddleware(
  repositorioUsuario: RepositorioUsuario,
  provedorToken: AuthToken,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () =>
      res.status(403).json({ message: "token inválido." });

    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        acessoNegado();
        return;
      }

      const usuarioToken = provedorToken.decode(token) as idToken;
      if (!usuarioToken) {
        acessoNegado();
        return;
      }

      const usuario = await repositorioUsuario.obterUsuarioPorId(
        usuarioToken.id,
      );
      if (!usuario?.habilitado || !usuario?.getTokenReFreshToken()) {
        acessoNegado();
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
