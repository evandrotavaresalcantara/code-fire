import { Middleware } from "@/adapters/middlewares/middleware";
import { RegistrarUsuario } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class RegistrarUsuarioController {
  constructor(
    private server: Router,
    private useCase: RegistrarUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/registrar-usuario",
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
