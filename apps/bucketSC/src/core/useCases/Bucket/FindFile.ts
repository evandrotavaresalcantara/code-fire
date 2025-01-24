import { Bucket } from "@/core/model";
import { UseCase } from "@/core/Providers";

interface Input {
  bucketName?: string;
  userId?: string;
  fileName?: string;
}

interface FoundFiles {
  name: string;
  path: string;
  bucket: string;
  isDirectory: boolean;
}
type Output = FoundFiles[];

export class FindFile implements UseCase<Input, Promise<Output>> {
  async execute(input: Input): Promise<Output> {
    const bucket = new Bucket(input.bucketName, input.userId);
    return bucket.findFile(input.fileName);
  }
}
