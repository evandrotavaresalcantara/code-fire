import { Middleware } from "@/adapters/middlewares/middleware";
import RegistrarUsuario from "@packages/auth/src/usecases/usuario/RegistrarUsuario";
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
            celular: req.body.telefone as string,
            ativo: req.body.ativo as boolean,
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
