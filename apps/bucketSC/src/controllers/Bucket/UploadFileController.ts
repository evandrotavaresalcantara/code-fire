import { uploadMulter } from "@/adapters";
import { CreateBucket } from "@/core";
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
 * /v1/bucket/files/upload:
 *   post:
 *     summary: Upload de um arquivo no Bucket.
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
 *     requestBody:
 *       required: true
 *       description: Selecione o arquivo para realizar o upload para o Bucket informado
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File saved"
 *                 filename:
 *                   type: string
 *                   example: "teste.txt"
 *                 path:
 *                   type: string
 *                   example: "bucketname/subfolder"
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

export class UploadFileController {
  constructor(
    private server: Router,
    private useCase: CreateBucket,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.post(
      "/files/upload",
      middleware,
      uploadMulter().single("file"),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          if (!req.file) {
            res.status(400).json({ message: "Nenhum arquivo foi enviado." });
            return;
          }
          const input = {
            folderName: req.query.folderName as string,
            bucketName: req.query.bucketName as string,
            user: req.user,
            filename: req.file.filename,
            mimeType: req.file.mimetype,
          };
          // TODO: falta implementar gravar DB
          // useCase.execute(input);
          res.status(201).json({
            message: "File saved",
            filename: input.filename,
            path: `${input.bucketName}/${input.folderName || ""}`,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
