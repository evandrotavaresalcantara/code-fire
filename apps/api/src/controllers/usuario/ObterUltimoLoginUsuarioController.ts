import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterUltimoLoginUsuario } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class ObterUltimoLoginUsuarioController {
  constructor(
    private server: Router,
    private useCase: ObterUltimoLoginUsuario,
    ...middleware: Middleware[]
  ) {
    this.server.get(
      "/login/ultimo",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.query.email as string,
          };
          if (!input.email) {
            res.status(422).json({ message: "email query params obrigatório" });
            return;
          }
          const output = await this.useCase.executar(input);
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
