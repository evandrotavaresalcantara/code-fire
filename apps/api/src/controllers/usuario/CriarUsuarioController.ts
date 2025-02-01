import { Middleware } from "@/adapters/middlewares/middleware";
import { CriarUsuario } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class CriarUsuarioController {
  constructor(
    private server: Router,
    private useCase: CriarUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/novo-usuario",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            nomeCompleto: req.body.nome as string,
            senha: req.body.senha as string,
            senhaConfirmacao: req.body.senhaConfirmacao as string,
            email: req.body.email as string,
            telefone: req.body.celular as string,
            ativo: req.body.ativo as boolean,
            urlPerfil: req.body.urlPerfil as string,
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
