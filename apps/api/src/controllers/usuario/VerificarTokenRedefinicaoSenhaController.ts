import { Middleware } from "@/adapters/middlewares/middleware";
import { VerificarTokenRedefinicaoSenha } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class VerificarTokenRedefinicaoSenhaController {
  constructor(
    private server: Router,
    private useCase: VerificarTokenRedefinicaoSenha,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/verificar-token",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            token: req.body.token as string,
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
