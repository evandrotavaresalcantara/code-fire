import { Middleware } from "@/adapters/middlewares/middleware";
import { CriarTokenParaQrCode } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class CriarTokenParaQrCodeController {
  constructor(
    private server: Router,
    private useCase: CriarTokenParaQrCode,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/qrcode/login",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            email: req.body.email as string,
          };
          const output = await this.useCase.executar(input);
          res.status(201).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
