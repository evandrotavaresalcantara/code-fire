import { Bucket } from "@/core/model";
import { UseCase } from "@/core/Providers";

interface Input {
  filename?: string;
  bucketName?: string;
  folderName?: string;
  userId?: string;
}

export class DeleteFile implements UseCase<Input, Promise<void>> {
  async execute(input: Input): Promise<void> {
    const bucket = new Bucket(input.bucketName, input.userId);
    bucket.deleteFile(input.filename, input.folderName);
  }
}
