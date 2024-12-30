import {
  AtualizarAccessRefreshTokens,
  AuthTokenJWTAsymmetricAdapter,
  RedefinirSenhaPorEmail,
  VerificarTokenRedefinicaoSenha,
} from "@packages/auth/src";
import ProvedorCriptografiaBcryptAdapter from "@packages/auth/src/adapter/Criptografia/ProvedorCriptografiaBcryptAdapter";
import AtualizarSenhaPeloEmailToken from "@packages/auth/src/usecases/usuario/AtualizarSenhaPeloEmailToken";
import LoginUsuario from "@packages/auth/src/usecases/usuario/LoginUsuario";
import RegistrarUsuario from "@packages/auth/src/usecases/usuario/RegistrarUsuario";
import { ServidorEmailNodeMailerAdapter } from "@packages/email/src";
import {
  enviarEmailSenhaEsquecida,
  RabbitMQAdapter,
} from "@packages/queue/src";
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import {
  PgPromiseAdapter,
  RepositorioPerfilPgPromiseAdapter,
  RepositorioPermissaoPgPromiseAdapter,
  RepositorioUsuarioPgPromiseAdapter,
} from "./adapters";
import { ENV } from "./config";
import {
  AtualizarAccessRefreshTokensController,
  LoginUsuarioController,
  RedefinirSenhaPorEmailController,
  RegistrarUsuarioController,
  VerificarTokenRedefinicaoSenhaController,
} from "./controllers";
import { AtualizarSenhaPeloEmailTokenController } from "./controllers/usuario/AtualizarSenhaPeloEmailTokenController";

// Configuração Ambiente ----------------------------------------------
console.log(`🟢 ENVIRONMENT: ${ENV.NODE_ENV} 🟢`);
// Inicia Servidor Express ------------------------------------------
const app = express();
// Configuração Básica ----------------------------------------------
const corsOptions: CorsOptions = {
  origin: ENV.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  // credentials: true,
  // exposedHeaders: ["Content-Disposition"],
};
app.use(cors(corsOptions));
app.use(morgan(ENV.LOGGER_LEVELINFO));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const userMiddleware = UserMiddleware()
app.listen(ENV.API_PORT, () => {
  console.log(`🔥 Server is running on port ${ENV.API_PORT}`);
});
// ROTA PRINCIPAL - V1 ------------------------------------
const v1Router = express.Router();
app.use("/v1", v1Router);
// ROTAS AUTH ---------------------------------------------
const authRouter = express.Router();
v1Router.use("/auth", authRouter);
// Error Handler ------------------------------------------
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error);
    return; // Se os headers já foram enviados, não tente enviar outra resposta
  }
  if (error instanceof Error) {
    if (error.message.startsWith("Dados Inválidos: ")) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error.message.startsWith("Não Autorizado: ")) {
      res.status(403).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
    return;
  } else {
    res.status(500).json({ message: "Erro desconhecido" });
    return;
  }
});
// ADAPTADORES --------------------------------------------
const databaseConnection = new PgPromiseAdapter();
const queueRabbitMQ = RabbitMQAdapter.getInstance(
  ENV.AMQP_USER,
  ENV.AMQP_PASSWORD,
  ENV.AMQP_HOST,
  ENV.AMQP_PORT,
);
const servidorEmail = new ServidorEmailNodeMailerAdapter(
  ENV.EMAIL_HOST || "",
  ENV.EMAIL_HOST_PORT,
  ENV.EMAIL_HOST_SECURE_SSL,
  ENV.EMAIL_HOST_USER || "",
  ENV.EMAIL_HOST_PASSWORD || "",
);
const repositorioPermissao = new RepositorioPermissaoPgPromiseAdapter(
  databaseConnection,
);
const repositorioPerfil = new RepositorioPerfilPgPromiseAdapter(
  databaseConnection,
  repositorioPermissao,
);
const repositorioUsuario = new RepositorioUsuarioPgPromiseAdapter(
  databaseConnection,
  repositorioPerfil,
);
const provedorCriptografia = new ProvedorCriptografiaBcryptAdapter();
const authToken = new AuthTokenJWTAsymmetricAdapter();
// CASOS DE USO ------------------------------------------
const loginUsuario = new LoginUsuario(
  repositorioUsuario,
  provedorCriptografia,
  authToken,
);
const redefinirSenhaPorEmail = new RedefinirSenhaPorEmail(
  repositorioUsuario,
  queueRabbitMQ,
);
const verificarTokenRedefinicaoSenha = new VerificarTokenRedefinicaoSenha(
  repositorioUsuario,
);
const atulizarSenhaPeloEmailToken = new AtualizarSenhaPeloEmailToken(
  repositorioUsuario,
  provedorCriptografia,
);
const registrarUsuario = new RegistrarUsuario(
  repositorioUsuario,
  provedorCriptografia,
);
const atualizarAccessRefreshTokens = new AtualizarAccessRefreshTokens(
  repositorioUsuario,
  authToken,
);
// CONTROLLERS -------------------------------------------
new LoginUsuarioController(authRouter, loginUsuario);
new RedefinirSenhaPorEmailController(authRouter, redefinirSenhaPorEmail);
new VerificarTokenRedefinicaoSenhaController(
  authRouter,
  verificarTokenRedefinicaoSenha,
);
new AtualizarSenhaPeloEmailTokenController(
  authRouter,
  atulizarSenhaPeloEmailToken,
);
new RegistrarUsuarioController(authRouter, registrarUsuario);
new AtualizarAccessRefreshTokensController(
  authRouter,
  atualizarAccessRefreshTokens,
);
// CONSUMERS ---------------------------------------------
enviarEmailSenhaEsquecida(queueRabbitMQ, servidorEmail);
// Gerenciamento de Desconexão do RabbitMQ
const shutdown = async () => {
  await queueRabbitMQ.disconnect(); // Chame o método de desconexão do RabbitMQ
  console.log("Desconectado do RabbitMQ");
  process.exit(0); // Finaliza o processo após a desconexão
};
// Interceptar eventos de desligamento da aplicação
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
