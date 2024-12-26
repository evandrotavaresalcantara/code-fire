import LoginUsuario from "@packages/auth/src/usecases/usuario/LoginUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class LoginUsuarioController {
  constructor(private server: Router, private useCase: LoginUsuario) {
    this.server.post(
      "/login",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.body.email as string,
            senha: req.body.password as string,
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
