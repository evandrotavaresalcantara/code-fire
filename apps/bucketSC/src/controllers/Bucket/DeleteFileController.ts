import { DeleteFile } from "@/core";
import { NextFunction, Request, Response, Router } from "express";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /v1/bucket/files:
 *   delete:
 *     summary: Excluir um arquivo no Bucket.
 *     tags: [Bucket]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: bucketName
 *         in: query
 *         description: Nome do Bucket.
 *         required: true
 *         schema:
 *           type: string
 *       - name: folderName
 *         in: query
 *         description: Nome da subpasta ou das subpastas onde está o arquivo dentro do bucket.
 *         required: false
 *         schema:
 *           type: string
 *       - name: fileName
 *         in: query
 *         description: Nome do arquivo com a extensão que pretende download.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Arquivo excluído com sucesso.
 *       400:
 *         description: Algum parâmetro errado ou  ausente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Dados Inválidos: Arquivo não existe"
 *       403:
 *         description: Usuário não autorizado.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Usuário não autorizado"
 */

export class DeleteFileController {
  constructor(
    private server: Router,
    private useCase: DeleteFile,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.delete(
      "/files",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            folderName: req.query.folderName as string,
            bucketName: req.query.bucketName as string,
            filename: req.query.fileName as string,
            userId: req.user?.id,
          };
          await this.useCase.execute(input);
          res.sendStatus(204);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
