import { Middleware } from "@/adapters/middlewares/middleware";
import AtualizarUsuario from "@packages/auth/src/usecases/usuario/AtualizarUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarUsuarioController {
  constructor(
    private server: Router,
    private useCase: AtualizarUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.put(
      "/atualizar-usuario/:id",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            nomeCompleto: req.body.nome as string,
            telefone: req.body.celular as string,
            urlPerfil: req.body.urlPerfil as string,
            email: req.body.email as string,
            autenticacaoDoisFatores: req.body
              .autenticacaoDoisFatores as boolean,
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
