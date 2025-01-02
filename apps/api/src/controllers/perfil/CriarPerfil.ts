import CriarPerfil from "@packages/auth/src/usecases/perfil/CriarPerfil";
import { NextFunction, Request, Response, Router } from "express";

export class CriarPerfilController {
  constructor(private server: Router, private useCase: CriarPerfil) {
    this.server.post(
      "/perfis",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            nome: req.body.name as string,
            descricao: req.body.description as string,
            ativo: req.body.active as boolean,
            permissoes: req.body.permissions as [],
          };
          await this.useCase.executar(input);
          res.sendStatus(201);
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
