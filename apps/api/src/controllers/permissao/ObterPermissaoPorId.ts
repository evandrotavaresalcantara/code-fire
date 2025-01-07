import { ObterPermissaoPorId } from "@packages/auth/src/usecases/permissao";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPermissaoPorIdController {
  constructor(private server: Router, private useCase: ObterPermissaoPorId) {
    this.server.get(
      "/permissoes/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = { id: req.params.id as string };
          const output = await this.useCase.executar(input);
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
