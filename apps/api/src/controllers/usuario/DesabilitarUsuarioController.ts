import { Middleware } from "@/adapters/middlewares/middleware";
import { DesabilitarUsuario } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class DesabilitarUsuarioController {
  constructor(
    private server: Router,
    private useCase: DesabilitarUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/desabilitar-usuario/:id",
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
