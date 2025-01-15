import { Middleware } from "@/adapters/middlewares/middleware";
import RemoverUsuario from "@packages/auth/src/usecases/usuario/RemoverUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class RemoverUsuarioController {
  constructor(
    private server: Router,
    private useCase: RemoverUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.delete(
      "/usuarios/:id",
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
