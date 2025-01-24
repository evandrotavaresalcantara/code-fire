import { Bucket } from "@/core/model";
import { UseCase } from "@/core/Providers";

interface Input {
  folderName?: string;
  userId?: string;
}

export class CreateBucket implements UseCase<Input, void> {
  execute(input: Input): void {
    const bucket = new Bucket(input.folderName, input.userId);
    bucket.create();
  }
}
