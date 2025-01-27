import { Middleware } from "@/adapters/middlewares/middleware";
import { VerificarOtpExiste } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class VerificarOtpExisteController {
  constructor(
    private server: Router,
    private useCase: VerificarOtpExiste,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/verificar-otp",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = req.body.email as string;
          const output = await this.useCase.executar(input);
          res.status(200).json({ expired_at: output });
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
