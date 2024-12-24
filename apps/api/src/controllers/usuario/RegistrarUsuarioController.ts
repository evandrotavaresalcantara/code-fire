import RegistrarUsuario from "@packages/auth/src/usecases/usuario/RegistrarUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class RegistrarUsuarioController {
  constructor(private server: Router, private useCase: RegistrarUsuario) {
    this.server.post(
      "/registrar-usuario",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            nomeCompleto: req.body.name as string,
            senhaConfirmacao: req.body.passwordConfirm as string,
            email: req.body.email as string,
            senha: req.body.password as string,
            celular: req.body.telephone as string,
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
