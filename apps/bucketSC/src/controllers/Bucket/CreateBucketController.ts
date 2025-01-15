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
 * /v1/bucket/create-bucket:
 *   post:
 *     summary: Cria um novo bucket.
 *     tags: [Bucket]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               folderName:
 *                 type: string
 *                 description: Nome da pasta a ser criada.
 *     responses:
 *       201:
 *         description: Bucket criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bucket created"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
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

export class CreateBucketController {
  constructor(
    private server: Router,
    private useCase: CreateBucket,
    ...middleware: [
      (req: Request, res: Response, next: NextFunction) => Promise<void>
    ]
  ) {
    this.server.post(
      "/create-bucket",
      middleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const folderName = req.body.folderName;
          const user = req.user;
          useCase.execute({ folderName, userId: user?.id });
          res.status(201).json({ message: "Bucket created", user });
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
