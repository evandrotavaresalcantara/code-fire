import { NextFunction, Request, Response } from "express";
import { AuthToken } from "../core";
import { Errors } from "../core/constants";

interface PayloadTokenId {
  id: string;
  nome: string;
  email: string;
  urlPerfil: string;
  isSisAdmin: boolean;
  perfis: string[];
  iat: number;
  exp: number;
}

export function userSecurityJWTAuthMiddleware(provedorToken: AuthToken) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        res.status(401).json({ message: Errors.USUARIO_OBRIGATORIO });
        return;
      }
      if (!provedorToken.verify(token)) {
        res.status(403).json({ message: Errors.USUARIO_NAO_AUTORIZADO });
        return;
      }
      const user = provedorToken.decode<PayloadTokenId>(token);
      // TODO: falta adicionar verificação se o usuário está ativo
      if (!user) {
        res.status(401).json({ message: Errors.USUARIO_OBRIGATORIO });
        return;
      }
      req.user = {
        id: user.id,
        name: user.nome,
        email: user.email,
        apiKey: token,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      next();
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      next(error);
    }
  };
}
