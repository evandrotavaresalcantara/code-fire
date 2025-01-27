import { Middleware } from "@/adapters/middlewares/middleware";
import { LoginPeloQrCode } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class LoginPeloQrCodeController {
  constructor(
    private server: Router,
    private useCase: LoginPeloQrCode,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/login-qrcode",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            token: req.body.token as string,
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
