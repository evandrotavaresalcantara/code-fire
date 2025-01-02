import { ObterPermissoes } from "@packages/auth/src/usecases/permissao";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPermissoesController {
  constructor(private server: Router, private useCase: ObterPermissoes) {
    this.server.get(
      "/permissoes",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await this.useCase.executar();
          res.send(output).json(200);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
