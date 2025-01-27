import { Middleware } from "@/adapters/middlewares/middleware";
import { RemoverTokenParaQrCode } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class RemoverTokenParaQrCodeController {
  constructor(
    private server: Router,
    private useCase: RemoverTokenParaQrCode,
    ...middleware: Middleware[]
  ) {
    this.server.delete(
      "/qrcode/login",
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
          await this.useCase.executar(input);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
