import { Middleware } from "@/adapters/middlewares/middleware";
import { ObterTokenParaQrCode } from "@packages/auth";
import { NextFunction, Request, Response, Router } from "express";

export class ObterTokenParaQrCodeController {
  constructor(
    private server: Router,
    private useCase: ObterTokenParaQrCode,
    ...middleware: Middleware[]
  ) {
    this.server.get(
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
          const output = await this.useCase.executar(input);
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
