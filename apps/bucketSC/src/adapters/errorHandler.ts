import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
    return; // Se os headers já foram enviados, não tente enviar outra resposta
  }
  if (error instanceof Error) {
    if (error.message.startsWith("Dados Inválidos: ")) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
    return;
  } else {
    res.status(500).json({ message: `Erro desconhecido: ${error}` });
    return;
  }
}
