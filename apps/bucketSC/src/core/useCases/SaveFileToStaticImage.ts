import { UseCase } from "../Providers";

interface Input {
  file: string;
}

interface Output {
  url: string;
}

export class SaveFileToStatic implements UseCase<Input, Output> {
  execute(input: Input): Output {
    throw new Error("Method not implemented.");
  }
}
