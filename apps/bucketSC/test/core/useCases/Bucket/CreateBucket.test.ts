import { Bucket } from "@/core/model";
import { CreateBucket } from "@/core/useCases/Bucket";
import fs from "node:fs";

test("Deve criar um Bucket do usuário", () => {
  const createBucket = new CreateBucket();
  const input = {
    folderName: "teste",
    userId: "22",
  };
  const bucket = new Bucket(input.folderName, input.userId);
  const output = createBucket.execute(input);
  fs.rmSync(bucket.getBucketPath().replace(`/${input.folderName}`, ""), {
    recursive: true,
    force: true,
  });
  expect(output).toBeUndefined();
});
