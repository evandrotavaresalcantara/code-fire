import { Middleware } from "@/adapters/middlewares/middleware";
import AtualizarSenha from "@packages/auth/src/usecases/usuario/AtualizarSenha";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarSenhaController {
  constructor(
    private server: Router,
    private useCase: AtualizarSenha,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/alterar-senha/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            senhaAntiga: req.body.senhaAntiga as string,
            senhaNova: req.body.senhaNova as string,
            senhaNovaConfirmacao: req.body.senhaNovaConfirmacao as string,
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
