import { UserRepositoryMongodbAdapter } from "@/adapters";
import { DatabaseConnectionMongodbAdapter } from "@/adapters/database/mongoose";
import { Bucket, User } from "@/core/model";
import axios from "axios";
import fs from "node:fs";

let databaseConnection: DatabaseConnectionMongodbAdapter;

beforeAll(() => {
  databaseConnection = new DatabaseConnectionMongodbAdapter();
});

afterAll(async () => {
  await databaseConnection.close();
});

test("Deve receber um status 201 após criar um novo Bucket do usuário", async () => {
  const userRepository = new UserRepositoryMongodbAdapter(databaseConnection);
  const user = User.register("Teste da Silva", "testedasilva@zmail.com");
  const apiKey = user.getApiKey();
  const userId = await userRepository.create(user);
  const axiosApi = axios.create({
    baseURL: "http://localhost:7000/v1",
    validateStatus: () => true,
  });
  const data = {
    folderName: "teste",
  };
  const response = await axiosApi.post("bucket/create-bucket", data, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  await userRepository.deleteByEmail(user.getEmail());
  const bucket = new Bucket(data.folderName, userId);
  fs.rmSync(bucket.getBucketPath().replace(`/${data.folderName}`, ""), {
    recursive: true,
    force: true,
  });
  expect(response.status).toBe(201);
});
