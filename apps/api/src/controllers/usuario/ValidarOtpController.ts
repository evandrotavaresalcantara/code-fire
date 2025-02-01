import { Middleware } from "@/adapters/middlewares/middleware";
import { ValidarOtp } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ValidarOtpController {
  constructor(
    private server: Router,
    private useCase: ValidarOtp,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/login/otp-validacao",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.body.email as string,
            codigoOtp: req.body.otpCode as string,
            loginType: req.body.loginType as string,
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
