import fs from "node:fs";
import path from "node:path/posix";
import { Errors } from "../constants";

export class Bucket {
  private rootPath = path.resolve(__dirname, "../");
  private rootFolder = "rootFolder";
  private bucketFolder: string;
  private userId: string;

  constructor(bucketFolder?: string, userId?: string) {
    if (!bucketFolder)
      throw new Error(`Dados Inválidos: ${Errors.BUCKET_FOLDER_OBRIGATORIO}`);
    this.bucketFolder = bucketFolder.trim();
    if (!userId)
      throw new Error(`Dados Inválidos: ${Errors.USUARIO_OBRIGATORIO}`);
    this.userId = userId.trim();
  }

  getBucketPath(subFolder?: string) {
    const bucketPath = subFolder
      ? path.join(this.bucketFolder, subFolder.replace("..", ""))
      : this.bucketFolder;
    return path.join(this.rootPath, this.rootFolder, this.userId, bucketPath);
  }

  create() {
    // const bucketPath = subFolder;
    // ? path.join(this.bucketFolder, subFolder.replace("..", ""))
    // : this.bucketFolder;
    if (fs.existsSync(this.getBucketPath()))
      throw new Error(
        `Dados Inválidos: ${Errors.BUCKET_JA_EXISTE} ${this.bucketFolder}`
      );
    fs.mkdirSync(this.getBucketPath(), { recursive: true });
  }

  getFiles(subFolder?: string) {
    if (!fs.existsSync(this.getBucketPath(subFolder?.replace("..", ""))))
      throw new Error(
        `Dados Inválidos: ${Errors.BUCKET_NAO_EXISTE} -> ${this.bucketFolder}`
      );
    const allFiles = fs.readdirSync(
      this.getBucketPath(subFolder?.replace("..", "")),
      {
        withFileTypes: true,
        recursive: true,
      }
    );
    return allFiles.map((file) => {
      return {
        name: file.name,
        path: file.path.replace(this.getBucketPath(), ""),
        bucket: this.bucketFolder,
        isDirectory: file.isDirectory(),
      };
    });
  }

  findFile(fileName?: string) {
    if (!fileName)
      throw new Error(`Dados Inválidos: ${Errors.FILE_NAME_OBRIGATORIO}`);
    const files = this.getFiles();
    const foundFiles = [];
    for (const file of files) {
      if (!file.isDirectory && file.name.includes(fileName)) {
        foundFiles.push(file);
      }
    }
    return foundFiles;
  }

  downloadFile(fileName: string, subFolder?: string) {
    const filePath = path.join(
      this.getBucketPath(subFolder?.replace("..", "")),
      fileName
    );
    if (fs.existsSync(filePath)) {
      return fs.createReadStream(filePath, { autoClose: true });
    }
  }

  deleteFile(fileName?: string, subFolder?: string) {
    if (!fileName)
      throw new Error(`Dados Inválidos: ${Errors.FILE_NAME_OBRIGATORIO}`);
    const filePath = path.join(
      this.getBucketPath(subFolder?.replace("..", "")),
      fileName
    );
    if (!fs.existsSync(filePath)) {
      throw new Error(`Dados Inválidos: ${Errors.ARQUIVO_NAO_EXISTE}`);
    }
    return fs.unlinkSync(filePath);
  }
}
