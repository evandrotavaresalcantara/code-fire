import { FindFile } from "@/core";
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
 * /v1/bucket/files/find:
 *   get:
 *     summary: Procure por um arquivo no Bucket.
 *     tags: [Bucket]
 *     security:
 *       - BearerAuth: [] # Referência ao esquema de segurança definido acima
 *     parameters:
 *       - name: bucketName
 *         in: query
 *         description: Nome do Bucket.
 *         required: true
 *         schema:
 *           type: string
 *       - name: fileName
 *         in: query
 *         description: Nome do arquivo ou parcial nome do arquivo.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: "teste.txt"
 *                  path:
 *                    type: string
 *                    example: "/subfolder"
 *                  bucket:
 *                    type: string
 *                    example: "bucketName"
 *                  isDirectory:
 *                    type: boolean
 *                    example: false
 *       400:
 *         description: Algum parâmetro errado ou  ausente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Dados Inválidos: Bucket não existe"
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

export class FindFileController {
  constructor(
    private server: Router,
    private useCase: FindFile,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.get(
      "/files/find",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            bucketName: req.query.bucketName as string,
            fileName: req.query.fileName as string,
            userId: req.user?.id,
          };
          const output = await this.useCase.execute(input);
          if (output.length === 0) {
            res.sendStatus(204);
            return;
          }
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
