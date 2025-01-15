import { Middleware } from "@/adapters/middlewares/middleware";
import ExcluirPerfil from "@packages/auth/src/usecases/perfil/ExcluirPerfil";
import { NextFunction, Request, Response, Router } from "express";

export class ExcluirPerfilController {
  constructor(
    private server: Router,
    private useCase: ExcluirPerfil,
    ...middleware: Middleware[]
  ) {
    this.server.delete(
      "/perfis/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
          };
          await this.useCase.executar(input.id);
          res.sendStatus(201);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
