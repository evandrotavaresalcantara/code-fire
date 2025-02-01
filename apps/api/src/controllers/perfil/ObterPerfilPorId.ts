import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterPerfilPorId } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPerfilPorIdController {
  constructor(
    private server: Router,
    private useCase: ObterPerfilPorId,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/perfis/:id",
      ...middleware,
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
