import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterPerfis } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPerfisController {
  constructor(
    private server: Router,
    private useCase: ObterPerfis,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/perfis",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await this.useCase.executar();
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
