import { ObterPerfis } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class ObterPerfisController {
  constructor(private server: Router, private useCase: ObterPerfis) {
    this.server.get(
      "/perfis",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const output = await this.useCase.executar();
          res.send(output).json(200);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
