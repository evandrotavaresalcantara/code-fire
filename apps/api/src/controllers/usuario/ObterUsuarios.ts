import { ObterUsuarios } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class ObterUsuariosController {
  constructor(private server: Router, private useCase: ObterUsuarios) {
    this.server.get(
      "/usuarios",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await this.useCase.executar();
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
