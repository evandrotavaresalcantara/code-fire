import { Bucket, getAllBucketsForUserId } from "@/core";
import { Errors } from "@/core/constants";
import fs from "node:fs";

test("Deve listar todos os buckets de um usuário", async () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  const buckets = await getAllBucketsForUserId(userId);
  expect(buckets).toHaveLength(1);
  expect(buckets[0]).toBe(bucketName);
  fs.rmdirSync(bucket.getBucketPath());
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
});

test("Deve listar todos os buckets de um usuário sem bucket", async () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  fs.rmdirSync(bucket.getBucketPath());
  const buckets = await getAllBucketsForUserId(userId);
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
  expect(buckets).toHaveLength(0);
});

test("Deve lancar erro USUARIO_OBRIGATORIO ao listar todos os buckets de um usuário", async () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  fs.rmdirSync(bucket.getBucketPath());
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
  await expect(getAllBucketsForUserId()).rejects.toThrow(
    new Error(`Dados Inválidos: ${Errors.USUARIO_OBRIGATORIO}`)
  );
});

test("Deve lancar erro DIRETORIO_USUARIO_NAO_EXISTE ao listar todos os buckets de um usuário", async () => {
  const bucketName = "teste";
  const userId = "123";
  const bucket = new Bucket(bucketName, userId);
  bucket.create();
  fs.rmdirSync(bucket.getBucketPath());
  fs.rmdirSync(bucket.getBucketPath().replace(`/${bucketName}`, ""));
  await expect(getAllBucketsForUserId(userId)).rejects.toThrow(
    new Error(`Dados Inválidos: ${Errors.DIRETORIO_USUARIO_NAO_EXISTE}`)
  );
});
