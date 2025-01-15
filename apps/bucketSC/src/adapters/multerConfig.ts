import { Bucket, Formatter } from "@/core";
import multer, { FileFilterCallback, Multer } from "multer";
import fs from "node:fs";
import path from "node:path";

// app.use("/files", express.static("uploads"))
export const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.resolve("uploads"));
  },
  filename: (_req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

export const memoryXlsx: Multer = multer({
  storage: multer.memoryStorage(), // Armazena o arquivo em memória para acessar o buffer
  fileFilter: (_req, file, cb: FileFilterCallback) => {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "application/vnd.oasis.opendocument.spreadsheet"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Dados Inválidos: O arquivo deve estar no formato .xlsx ou .xls ou .ods, não em ${file.mimetype}`
        ) as unknown as null,
        false
      );
    }
  },
});

export function uploadMulter() {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const bucketName = req.query.bucketName as string;
        const user = req.user;
        const bucket = new Bucket(bucketName, user?.id);
        const folderName = req.query.folderName as string;
        const filePath = bucket.getBucketPath(folderName);
        fs.mkdirSync(filePath, { recursive: true });
        cb(null, filePath);
      },
      filename: function (req, file, cb) {
        cb(
          null,
          `${new Date().getTime()}-${Formatter.textToSlugLower(
            file.originalname
          )}`
        );
      },
    }),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  });
}
