import { GetAllFiles } from "@/core";
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
 *   get:
 *     summary: Listar todos os arquivos de um bucket ou subdiretório.
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
 *     responses:
 *       200:
 *         description: Lista dos arquivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "teste.txt"
 *                   path:
 *                     type: string
 *                     example: "/subfolder"
 *                   bucket:
 *                     type: string
 *                     example: "bucketName"
 *                   isDirectory:
 *                     type: boolean
 *                     example: false
 *       400:
 *         description: Algum parâmetro errado ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dados Inválidos: Bucket não existe"
 *       403:
 *         description: Usuário não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não autorizado"
 */

export class GetAllFilesController {
  constructor(
    private server: Router,
    private useCase: GetAllFiles,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.get(
      "/files",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            bucketName: req.query.bucketName as string,
            folderName: req.query.folderName as string,
            userId: req.user?.id,
          };
          const output = await this.useCase.execute(input);
          res.status(200).json(output);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
