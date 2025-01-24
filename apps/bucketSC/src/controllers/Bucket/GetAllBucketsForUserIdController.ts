import { getAllBucketsForUserId } from "@/core";
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
 * /v1/bucket/all-buckets:
 *   get:
 *     summary: Listar nome de todos buckets do usuário logado.
 *     tags: [Bucket]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista dos buckets
 *         content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: bucket1...
 *       400:
 *         description: Algum parâmetro errado ou  ausente
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Dados Inválidos: Usuário obrigatório"
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

export class GetAllBucketsForUserIdController {
  constructor(
    private server: Router,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.get(
      "/all-buckets",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userId = req.user?.id;
          const buckets = await getAllBucketsForUserId(userId);
          res.status(200).json(buckets);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
