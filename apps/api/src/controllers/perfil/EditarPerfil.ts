import EditarPerfil from "@packages/auth/src/usecases/perfil/EditarPerfil";
import { NextFunction, Request, Response, Router } from "express";

export class EditarPerfilController {
  constructor(private server: Router, private useCase: EditarPerfil) {
    this.server.put(
      "/perfis/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            nome: req.body.nome as string,
            descricao: req.body.descricao as string,
            permissoes: req.body.permissoes as string[],
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
