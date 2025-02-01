import { Middleware } from "@/adapters/middlewares/middleware";
import { ExcluirPermissao } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ExcluirPermissaoController {
  constructor(
    private server: Router,
    private useCase: ExcluirPermissao,
    ...middleware: Middleware[]
  ) {
    this.server.delete(
      "/permissoes/:id",
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
