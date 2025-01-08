import CriarPermissao from "@packages/auth/src/usecases/permissao/CriarPermissao";
import { NextFunction, Request, Response, Router } from "express";

export class CriarPermissaoController {
  constructor(private server: Router, private useCase: CriarPermissao) {
    this.server.post(
      "/permissoes",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
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
