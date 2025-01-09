import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterUsuarioPorId } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class ObterUsuarioPorIdController {
  constructor(
    private server: Router,
    private useCase: ObterUsuarioPorId,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/usuarios/:id",
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
