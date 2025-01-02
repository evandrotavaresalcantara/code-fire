import ExcluirPermissao from "@packages/auth/src/usecases/permissao/ExcluirPermissao";
import { NextFunction, Request, Response, Router } from "express";

export class ExcluirPermissaoController {
  constructor(private server: Router, private useCase: ExcluirPermissao) {
    this.server.delete(
      "/permissoes/:id",
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
