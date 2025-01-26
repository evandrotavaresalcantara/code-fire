import { Middleware } from "@/adapters/middlewares/middleware";
import { CriarTokenParaQrCode } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class CriarTokenParaQrCodeController {
  constructor(
    private server: Router,
    private useCase: CriarTokenParaQrCode,
    ...middleware: Middleware[]
  ) {
    this.server.post(
      "/login/criar-qrcode",
      ...middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.body.id as string,
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
