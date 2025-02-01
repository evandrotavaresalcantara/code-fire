import cors, { CorsOptions } from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import { errorHandler, UserRepositoryMongodbAdapter } from "./adapters";
import { DatabaseConnectionMongodbAdapter } from "./adapters/database/mongoose";
import {
  CreateBucketController,
  DeleteFileController,
  FindFileController,
  GetAllBucketsForUserIdController,
  GetAllFilesController,
  PublicImageFilesController,
  PublicStaticFilesController,
  UploadFileController,
} from "./controllers";
import { DownloadFileController } from "./controllers/Bucket/DownloadFileController";
import {
  CreateBucket,
  DeleteFile,
  DownloadFile,
  FindFile,
  GetAllFiles,
} from "./core";
import { userApiKeyAuthMiddleware } from "./middlewares";
import swaggerOptions from "./swaggerOptions";

// Configuração Ambiente ----------------------------------------------
console.log(`🟢 ENVIRONMENT: ${process.env.NODE_ENV} 🟢`);
const PORT = process.env.API_PORT || "7000";
// Inicia Servidor Express ------------------------------------------
const app = express();
// Configuração Básica ----------------------------------------------
const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  // methods: ["GET"], // Especifica métodos permitidos
  // credentials: true,
  // exposedHeaders: ["Content-Disposition"],
};
app.use(cors(corsOptions));
app.use(morgan(process.env.LOGGER_LEVELINFO || "common"));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
// const userMiddleware = UserMiddleware()
app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});
const options: SwaggerUiOptions = {
  customSiteTitle: "Bucket",
  customfavIcon: "",
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
};
// ROTA PRINCIPAL - V1 ------------------------------------
const v1Router = express.Router();
app.use("/v1", v1Router);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
v1Router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
const bucketRouter = express.Router();
v1Router.use("/bucket", bucketRouter);
const staticRouter = express.Router();
v1Router.use("/static", staticRouter);
app.use(errorHandler);
const databaseConnection = new DatabaseConnectionMongodbAdapter();
const userRepository = new UserRepositoryMongodbAdapter(databaseConnection);
// MIDDLEWARES --------------------------------------------
const authMiddleware = userApiKeyAuthMiddleware(userRepository);
// USECASES/CONTROLLERS -------------------------------------------
const createBucket = new CreateBucket();
new CreateBucketController(bucketRouter, createBucket, authMiddleware);
new UploadFileController(bucketRouter, createBucket, authMiddleware);
const downloadFile = new DownloadFile();
new DownloadFileController(bucketRouter, downloadFile, authMiddleware);
const findFile = new FindFile();
new FindFileController(bucketRouter, findFile, authMiddleware);
new GetAllBucketsForUserIdController(bucketRouter, authMiddleware);
const getAllFiles = new GetAllFiles();
new GetAllFilesController(bucketRouter, getAllFiles, authMiddleware);
const deleteFile = new DeleteFile();
new DeleteFileController(bucketRouter, deleteFile, authMiddleware);
new PublicStaticFilesController(staticRouter);
new PublicImageFilesController(staticRouter);
// userRepository
//   .getByApiKey(
//     "a6ece6bdd88b1d57aba1e1dc8cee63e91012a2cededbd1017023b512910f160a"
//   )
//   .then((user) => console.log(user))
//   .catch((e) => console.error(e.message));
