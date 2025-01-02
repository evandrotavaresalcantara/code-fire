import EditarPermissao from "@packages/auth/src/usecases/permissao/EditarPermissao";
import { NextFunction, Request, Response, Router } from "express";

export class EditarPermissaoController {
  constructor(private server: Router, private useCase: EditarPermissao) {
    this.server.put(
      "/permissoes/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            nome: req.body.name as string,
            descricao: req.body.description as string,
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
