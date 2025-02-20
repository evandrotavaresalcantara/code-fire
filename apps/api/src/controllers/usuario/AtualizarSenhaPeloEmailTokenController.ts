import { Middleware } from "@/adapters/middlewares/middleware";
import { AtualizarSenhaPeloEmailToken } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarSenhaPeloEmailTokenController {
  constructor(
    private server: Router,
    private useCase: AtualizarSenhaPeloEmailToken,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/alterar-senha-email",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            token: req.body.token as string,
            senhaNova: req.body.senhaNova as string,
            senhaNovaConfirmacao: req.body.senhaNovaConfirmacao as string,
          };
          const output = await this.useCase.executar(input);
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
