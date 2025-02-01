import { Middleware } from "@/adapters/middlewares/middleware";
import { LoginUsuario } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class LoginUsuarioController {
  constructor(
    private server: Router,
    private useCase: LoginUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/login",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.body.email as string,
            senha: req.body.senha as string,
          };
          const output = await this.useCase.executar(input);
          if (output.isAutenticacao2Fatores) {
            res.sendStatus(303);
            return;
          }
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
