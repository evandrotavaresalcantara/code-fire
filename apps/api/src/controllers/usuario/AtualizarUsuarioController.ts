import AtualizarUsuario from "@packages/auth/src/usecases/usuario/AtualizarUsuario";
import { NextFunction, Request, Response, Router } from "express";

export class AtualizarUsuarioController {
  constructor(private server: Router, private useCase: AtualizarUsuario) {
    this.server.put(
      "/atualizar-usuario/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            id: req.params.id as string,
            nomeCompleto: req.body.name as string,
            celular: req.body.telephone as string,
            urlPerfil: req.body.avatar as string,
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
