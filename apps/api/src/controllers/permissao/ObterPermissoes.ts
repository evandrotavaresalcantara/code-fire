import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterPermissoes } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPermissoesController {
  constructor(
    private server: Router,
    private useCase: ObterPermissoes,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/permissoes",
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
