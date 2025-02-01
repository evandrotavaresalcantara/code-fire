import { Middleware } from "@/adapters/middlewares/middleware";
import { EditarPermissao } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class EditarPermissaoController {
  constructor(
    private server: Router,
    private useCase: EditarPermissao,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/permissoes/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            nome: req.body.nome as string,
            descricao: req.body.descricao as string,
          };
          await this.useCase.executar(input);
          res.sendStatus(201);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
