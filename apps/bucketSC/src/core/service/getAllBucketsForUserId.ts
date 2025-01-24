import fs from "node:fs";
import path from "node:path";
import { Errors } from "../constants";

export async function getAllBucketsForUserId(userId?: string) {
  if (!userId)
    throw new Error(`Dados Inválidos: ${Errors.USUARIO_OBRIGATORIO}`);
  const rootPath = path.resolve(__dirname, "../../../");
  const rootFolder = "rootFolder";
  const userDir = path.join(rootPath, rootFolder, userId);
  if (!fs.existsSync(userDir))
    throw new Error(`Dados Inválidos: ${Errors.DIRETORIO_USUARIO_NAO_EXISTE}`);
  const allFiles = fs.readdirSync(userDir, {
    withFileTypes: true,
  });
  return allFiles.reduce<string[]>((dirs, file) => {
    if (file.isDirectory()) dirs.push(file.name);
    return dirs;
  }, []);
}
