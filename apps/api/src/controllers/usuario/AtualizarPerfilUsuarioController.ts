import AtualizarPerfilUsuario from "@packages/auth/src/usecases/usuario/AtualizarPerfilUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarPerfilUsuarioController {
  constructor(private server: Router, private useCase: AtualizarPerfilUsuario) {
    this.server.put(
      "/atualizar-perfil/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            perfis: req.body.perfis as string[],
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
