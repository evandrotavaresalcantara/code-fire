import { AtualizarAccessRefreshTokens } from "@packages/auth/src";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarAccessRefreshTokensController {
  constructor(
    private server: Router,
    private useCase: AtualizarAccessRefreshTokens,
  ) {
    this.server.post(
      "/atualizar-token",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            token: req.body.token as string,
            tokenId: req.body.tokenId as string,
          };
          const output = await this.useCase.executar(input);
          if (output) {
            res
              .status(200)
              .json({ token: output.token, tokenId: output.tokenId });
          } else {
            res.sendStatus(204);
          }
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
