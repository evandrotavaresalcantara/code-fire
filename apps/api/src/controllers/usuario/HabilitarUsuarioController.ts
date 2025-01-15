import { Middleware } from "@/adapters/middlewares/middleware";
import HabilitarUsuario from "@packages/auth/src/usecases/usuario/HabilitarUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class HabilitarUsuarioController {
  constructor(
    private server: Router,
    private useCase: HabilitarUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/habilitar-usuario/:id",
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
