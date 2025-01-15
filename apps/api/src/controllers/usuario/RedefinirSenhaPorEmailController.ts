import { Middleware } from "@/adapters/middlewares/middleware";
import { RedefinirSenhaPorEmail } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class RedefinirSenhaPorEmailController {
  constructor(
    private server: Router,
    private useCase: RedefinirSenhaPorEmail,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/recuperar-por-email",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.body.email as string,
            baseUrl: req.body.baseUrl as string,
          };
          await this.useCase.executar(input);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
