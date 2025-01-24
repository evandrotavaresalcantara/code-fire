import { DownloadFile } from "@/core";
import { Errors } from "@/core/constants";
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
 * /v1/bucket/files/download:
 *   get:
 *     summary: Download de um arquivo no Bucket.
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
 *       200:
 *         description: Arquivo baixado com sucesso.
 *         content:
 *            application/octet-stream:
 *              schema:
 *                type: string
 *                format: binary
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

export class DownloadFileController {
  constructor(
    private server: Router,
    private useCase: DownloadFile,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.get(
      "/files/download",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const input = {
            folderName: req.query.folderName as string,
            bucketName: req.query.bucketName as string,
            filename: req.query.fileName as string,
            userId: req.user?.id,
          };
          const output = await this.useCase.execute(input);
          res.download(output, (e) => {
            if (e) {
              if (e.message.startsWith("ENOENT: no such file or directory"))
                next(
                  new Error(
                    `Dados Inválidos: ${Errors.ARQUIVO_NAO_EXISTE} ${
                      input.bucketName
                    }/${input.folderName || ""}/${input.filename}`
                  )
                );
              next(e);
            }
          });
          // res.setHeader(
          //   "Content-Disposition",
          //   `attachment; filename="${input.filename}"`
          // );
          // output.pipe(res);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
