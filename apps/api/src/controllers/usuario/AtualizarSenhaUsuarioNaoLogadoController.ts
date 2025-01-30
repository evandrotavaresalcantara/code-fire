import { Middleware } from "@/adapters/middlewares/middleware";
import AtualizarSenhaUsuarioNaoLogado from "@packages/auth/src/usecases/usuario/AtualizarSenhaUsuarioNaoLogado";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarSenhaUsuarioNaoLogadoController {
  constructor(
    private server: Router,
    private useCase: AtualizarSenhaUsuarioNaoLogado,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/atualizar-usuario-nao-logado/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
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
