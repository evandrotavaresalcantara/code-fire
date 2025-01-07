import { ObterPerfilPorId } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPerfilPorIdController {
  constructor(private server: Router, private useCase: ObterPerfilPorId) {
    this.server.get(
      "/perfis/:id",
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
