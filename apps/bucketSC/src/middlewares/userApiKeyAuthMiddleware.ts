import { Errors } from "@/core/constants";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../core/Providers";

export function userApiKeyAuthMiddleware(userRepository: UserRepository) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
    // userRepository: UserRepository
  ): Promise<void> => {
    try {
      const apiKey = req.headers.authorization;
      if (!apiKey) {
        res.status(403).json({ message: Errors.USUARIO_NAO_AUTORIZADO });
        return;
      }
      const user = await userRepository.getByApiKey(
        apiKey.replace("Bearer ", "")
      );
      if (!user) {
        res.status(403).json({ message: Errors.USUARIO_NAO_AUTORIZADO });
        return;
      }
      req.user = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        id: user.getId()!,
        name: user.getName(),
        email: user.getEmail(),
        apiKey: user.getApiKey(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      };
      next();
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      next(error);
    }
  };
}
