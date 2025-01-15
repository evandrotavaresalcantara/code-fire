import { Errors } from "@/core/constants";
import { Bucket } from "@/core/model";
import { UseCase } from "@/core/Providers";
import path from "node:path";

interface Input {
  filename?: string;
  bucketName?: string;
  folderName?: string;
  userId?: string;
}

export class DownloadFile implements UseCase<Input, Promise<string>> {
  async execute(input: Input): Promise<string> {
    if (!input.filename || !input.bucketName) {
      throw new Error(Errors.DOWNLOAD_FILE_PARAMETROS_AUSENTES);
    }
    const bucket = new Bucket(input.bucketName, input.userId);
    return path.join(bucket.getBucketPath(input.folderName), input.filename);
    // const fileStream = bucket.downloadFile(input.filename, input.folderName);
    // if (!fileStream) {
    //   throw new Error(
    //     `Dados Inválidos: ${Errors.ARQUIVO_NAO_EXISTE} ${input.bucketName}/${input.folderName}/${input.filename}`
    //   );
    // }
    // return fileStream;
  }
}
