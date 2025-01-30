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
            nomeCompleto: req.body.nome as string,
            telefone: req.body.celular as string,
            urlPerfil: req.body.urlPerfil as string,
            email: req.body.email as string,
            sisAdmin: req.body.sisAdmin as boolean,
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
