import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterUsuarios } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ObterUsuariosController {
  constructor(
    private server: Router,
    private useCase: ObterUsuarios,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/usuarios",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await this.useCase.executar();
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
