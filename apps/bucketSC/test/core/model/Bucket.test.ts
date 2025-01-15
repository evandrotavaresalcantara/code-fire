import { Errors } from "@/core/constants";
import { Bucket } from "@/core/model";
import fs from "node:fs";
import path from "node:path";

function createRandomFiles(directory: string, count: number) {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
  for (let i = 0; i < count; i++) {
    const fileName = `file_${Math.random().toString(36).substring(7)}.txt`;
    const filePath = path.join(directory, fileName);
    fs.writeFileSync(filePath, "This is a random file.");
  }
}

test("Deve criar um bucket de um usuario", () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  expect(bucket).toBeInstanceOf(Bucket);
  expect(fs.existsSync(bucket.getBucketPath())).toBeTruthy();
  fs.rmdirSync(bucket.getBucketPath());
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
});

test("Deve lançar um erro ao criar um bucket de um usuario repetidamente", () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  expect(() => bucket.create()).toThrow(
    new Error("Dados Inválidos: Bucket já existe teste")
  );
  fs.rmdirSync(bucket.getBucketPath());
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
});

test("Deve listar todos os arquivos e diretorios de um bucket", () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  createRandomFiles(bucket.getBucketPath(), 5);
  const files = bucket.getFiles();
  expect(files).toHaveLength(5);
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});

test("Deve listar os arquivos e diretorios recursivos de um bucket", () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  const subfolderName = "sub1";
  bucket.create();
  createRandomFiles(bucket.getBucketPath(), 2);
  createRandomFiles(bucket.getBucketPath(subfolderName), 3);
  const files = bucket.getFiles();
  expect(files).toHaveLength(6);
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});

test("Deve procurar os arquivos recursivos de um bucket", () => {
  const bucketName = "teste123";
  const userId = "22";
  const bucket = new Bucket(bucketName, userId);
  const fileName = "testeFile.txt";
  const subfolderName = "sub1";
  bucket.create();
  const filePath1 = path.join(bucket.getBucketPath(subfolderName), fileName);
  const filePath2 = path.join(bucket.getBucketPath(), fileName);
  const filePath3 = path.join(bucket.getBucketPath(), "testeRandom.svg");
  const filePath4 = path.join(bucket.getBucketPath(), "test.jpg");
  if (!fs.existsSync(bucket.getBucketPath(subfolderName)))
    fs.mkdirSync(bucket.getBucketPath(subfolderName), { recursive: true });
  fs.writeFileSync(filePath1, "This is a random file1.");
  fs.writeFileSync(filePath2, "This is a random file2.");
  fs.writeFileSync(filePath3, "This is a random file2.");
  fs.writeFileSync(filePath4, "This is a random file2.");
  const files = bucket.findFile("testeFile");
  expect(files).toHaveLength(2);
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});

test("Deve deletar um arquivos de um bucket", () => {
  const bucketName = "teste123";
  const userId = "22";
  const bucket = new Bucket(bucketName, userId);
  const fileName = "testeFile.txt";
  const subfolderName = "sub1";
  bucket.create();
  const filePath1 = path.join(bucket.getBucketPath(subfolderName), fileName);
  const filePath2 = path.join(bucket.getBucketPath(), fileName);
  const filePath3 = path.join(bucket.getBucketPath(), "testeRandom.svg");
  const filePath4 = path.join(bucket.getBucketPath(), "test.jpg");
  if (!fs.existsSync(bucket.getBucketPath(subfolderName)))
    fs.mkdirSync(bucket.getBucketPath(subfolderName), { recursive: true });
  fs.writeFileSync(filePath1, "This is a random file1.");
  fs.writeFileSync(filePath2, "This is a random file2.");
  fs.writeFileSync(filePath3, "This is a random file2.");
  fs.writeFileSync(filePath4, "This is a random file2.");
  bucket.deleteFile(fileName, subfolderName);
  const files = bucket.findFile("testeFile");
  expect(files).toHaveLength(1);
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});
test("Deve lançar um erro ARQUIVO_NAO_EXISTE deletar um arquivos de um bucket", () => {
  const bucketName = "teste123";
  const userId = "22";
  const bucket = new Bucket(bucketName, userId);
  const fileName = "testeFile.txt";
  const subfolderName = "sub1";
  bucket.create();
  expect(() => bucket.deleteFile(fileName, subfolderName)).toThrow(
    new Error(`Dados Inválidos: ${Errors.ARQUIVO_NAO_EXISTE}`)
  );
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});
test("Deve lançar um erro FILE_NAME_OBRIGATORIO deletar um arquivos de um bucket", () => {
  const bucketName = "teste123";
  const userId = "22";
  const bucket = new Bucket(bucketName, userId);
  expect(() => bucket.deleteFile()).toThrow(
    new Error(`Dados Inválidos: ${Errors.FILE_NAME_OBRIGATORIO}`)
  );
  fs.rmSync(bucket.getBucketPath().replace(`/${bucketName}`, ""), {
    recursive: true,
    force: true,
  });
});
