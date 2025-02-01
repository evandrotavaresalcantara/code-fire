import { Errors } from "@packages/auth";
import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Response | void {
  console.error("Erro capturado pelo middleware:", error);
  if (res.headersSent) {
    return next(error); // Verifica se os headers já foram enviados
  }
  const isUserKnownError = Object.values(Errors).includes(
    error.message as (typeof Errors)[keyof typeof Errors],
  );
  if (isUserKnownError) {
    return res.status(400).json({ message: error.message });
  }
  return res
    .status(500)
    .json({ message: error.message || "Erro desconhecido" });
}
