import { Middleware } from "@/adapters/middlewares/middleware";
import LogoutUsuario from "@packages/auth/src/usecases/usuario/LogoutUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class LogoutUsuarioController {
  constructor(
    private server: Router,
    private useCase: LogoutUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/logout",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.body.userId as string,
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
