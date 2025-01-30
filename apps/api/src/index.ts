import {
  AtualizarAccessRefreshTokens,
  AuthTokenJWTAsymmetricAdapter,
  CriarTokenParaQrCode,
  LoginPeloQrCode,
  ObterPerfilPorId,
  ObterPerfis,
  ObterPermissaoPorId,
  ObterPermissoes,
  ObterTokenParaQrCode,
  ObterUsuarioPorId,
  ObterUsuarios,
  RedefinirSenhaPorEmail,
  RemoverTokenParaQrCode,
  ValidarOtp,
  VerificarOtpExiste,
  VerificarTokenRedefinicaoSenha,
} from "@packages/auth/src";
import ProvedorCriptografiaBcryptAdapter from "@packages/auth/src/adapter/Criptografia/ProvedorCriptografiaBcryptAdapter";
import CriarPerfil from "@packages/auth/src/usecases/perfil/CriarPerfil";
import EditarPerfil from "@packages/auth/src/usecases/perfil/EditarPerfil";
import ExcluirPerfil from "@packages/auth/src/usecases/perfil/ExcluirPerfil";
import CriarPermissao from "@packages/auth/src/usecases/permissao/CriarPermissao";
import EditarPermissao from "@packages/auth/src/usecases/permissao/EditarPermissao";
import ExcluirPermissao from "@packages/auth/src/usecases/permissao/ExcluirPermissao";
import AtualizarPerfilUsuario from "@packages/auth/src/usecases/usuario/AtualizarPerfilUsuario";
import AtualizarSenha from "@packages/auth/src/usecases/usuario/AtualizarSenha";
import AtualizarSenhaPeloEmailToken from "@packages/auth/src/usecases/usuario/AtualizarSenhaPeloEmailToken";
import AtualizarUsuario from "@packages/auth/src/usecases/usuario/AtualizarUsuario";
import CriarUsuario from "@packages/auth/src/usecases/usuario/CriarUsuario";
import DesabilitarUsuario from "@packages/auth/src/usecases/usuario/DesabilitarUsuario";
import HabilitarUsuario from "@packages/auth/src/usecases/usuario/HabilitarUsuario";
import LoginUsuario from "@packages/auth/src/usecases/usuario/LoginUsuario";
import LogoutUsuario from "@packages/auth/src/usecases/usuario/LogoutUsuario";
import RegistrarUsuario from "@packages/auth/src/usecases/usuario/RegistrarUsuario";
import RemoverUsuario from "@packages/auth/src/usecases/usuario/RemoverUsuario";
import { ServidorEmailNodeMailerAdapter } from "@packages/email/src";
import {
  enviarEmailSenhaEsquecida,
  RabbitMQAdapter,
} from "@packages/queue/src";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import {
  PgPromiseAdapter,
  RepositorioOtpPgPromiseAdapter,
  RepositorioPerfilPgPromiseAdapter,
  RepositorioPermissaoPgPromiseAdapter,
  RepositorioUsuarioPgPromiseAdapter,
} from "./adapters";
import PerfilRepositorioPgPrismaAdapter from "./adapters/database/PerfilRepositorioPgPrismaAdapter";
import PermissaoRepositorioPgPrismaAdapter from "./adapters/database/PermissaoRepositorioPgPrismaAdapter";
import UsuarioRepositorioPgPrismaAdapter from "./adapters/database/UsuarioRepositorioPgPrismaAdapter";
import UsuarioCookiesMiddleware from "./adapters/middlewares/UsuarioCookiesMiddleware";
import UsuarioMiddleware from "./adapters/middlewares/UsuarioMiddleware";
import { ENV } from "./config";
import {
  AtualizarAccessRefreshTokensController,
  AtualizarUsuarioController,
  CriarTokenParaQrCodeController,
  LoginPeloQrCodeController,
  LoginUsuarioController,
  ObterTokenParaQrCodeController,
  RedefinirSenhaPorEmailController,
  RegistrarUsuarioController,
  RemoverTokenParaQrCodeController,
  ValidarOtpController,
  VerificarOtpExisteController,
  VerificarTokenRedefinicaoSenhaController,
} from "./controllers";
import { CriarPerfilController } from "./controllers/perfil/CriarPerfil";
import { EditarPerfilController } from "./controllers/perfil/EditarPerfil";
import { ExcluirPerfilController } from "./controllers/perfil/ExcluirPerfil";
import { ObterPerfilPorIdController } from "./controllers/perfil/ObterPerfilPorId";
import { ObterPerfisController } from "./controllers/perfil/ObterPerfis";
import { CriarPermissaoController } from "./controllers/permissao/CriarPermissao";
import { EditarPermissaoController } from "./controllers/permissao/EditarPermissao";
import { ExcluirPermissaoController } from "./controllers/permissao/ExcluirPermissao";
import { ObterPermissaoPorIdController } from "./controllers/permissao/ObterPermissaoPorId";
import { ObterPermissoesController } from "./controllers/permissao/ObterPermissoes";
import { AtualizarPerfilUsuarioController } from "./controllers/usuario/AtualizarPerfilUsuarioController";
import { AtualizarSenhaController } from "./controllers/usuario/AtualizarSenhaController";
import { AtualizarSenhaPeloEmailTokenController } from "./controllers/usuario/AtualizarSenhaPeloEmailTokenController";
import { CriarUsuarioController } from "./controllers/usuario/CriarUsuarioController";
import { DesabilitarUsuarioController } from "./controllers/usuario/DesabilitarUsuarioController";
import { HabilitarUsuarioController } from "./controllers/usuario/HabilitarUsuarioController";
import { LogoutUsuarioController } from "./controllers/usuario/LogoutUsuarioController";
import { ObterUsuarioPorIdController } from "./controllers/usuario/ObterUsuarioPorId";
import { ObterUsuariosController } from "./controllers/usuario/ObterUsuarios";
import { RemoverUsuarioController } from "./controllers/usuario/RemoverUsuario";

// Configuração Ambiente ----------------------------------------------
console.log(`🟢 ENVIRONMENT: ${ENV.NODE_ENV} 🟢`);
// Inicia Servidor Express ------------------------------------------
const app = express();
// Configuração Básica ----------------------------------------------
const corsOptions: CorsOptions = {
  origin: ENV.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
  // exposedHeaders: ["Content-Disposition"],
};
app.use(cors(corsOptions));
app.use(morgan(ENV.LOGGER_LEVELINFO));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
    if (error.message.endsWith("não encontrado")) {
      res.status(404).json({ message: error.message });
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
const conexaoPrisma = new PrismaClient();
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
const repositorioPermissaoPrisma = new PermissaoRepositorioPgPrismaAdapter(
  conexaoPrisma,
);
const repositorioPerfilPrisma = new PerfilRepositorioPgPrismaAdapter(
  conexaoPrisma,
  repositorioPermissaoPrisma,
);
const repositorioUsuarioPrisma = new UsuarioRepositorioPgPrismaAdapter(
  conexaoPrisma,
  repositorioPerfilPrisma,
);
const repositorioOtp = new RepositorioOtpPgPromiseAdapter(databaseConnection);
const provedorCriptografia = new ProvedorCriptografiaBcryptAdapter();
const authToken = new AuthTokenJWTAsymmetricAdapter();
const rotaProtegida = UsuarioMiddleware(repositorioUsuarioPrisma, authToken);
const rotaProtegidaCookies = UsuarioCookiesMiddleware(
  repositorioUsuarioPrisma,
  authToken,
);
// CASOS DE USO ------------------------------------------
const loginUsuario = new LoginUsuario(
  repositorioUsuarioPrisma,
  repositorioOtp,
  provedorCriptografia,
  authToken,
  queueRabbitMQ,
);
const loginPeloQrCode = new LoginPeloQrCode(
  repositorioUsuario,
  repositorioOtp,
  authToken,
  queueRabbitMQ,
);
const redefinirSenhaPorEmail = new RedefinirSenhaPorEmail(
  repositorioUsuarioPrisma,
  queueRabbitMQ,
);
const verificarTokenRedefinicaoSenha = new VerificarTokenRedefinicaoSenha(
  repositorioUsuarioPrisma,
);
const atualizarSenhaPeloEmailToken = new AtualizarSenhaPeloEmailToken(
  repositorioUsuarioPrisma,
  provedorCriptografia,
);
const registrarUsuario = new RegistrarUsuario(
  repositorioUsuarioPrisma,
  provedorCriptografia,
);
const atualizarAccessRefreshTokens = new AtualizarAccessRefreshTokens(
  repositorioUsuarioPrisma,
  authToken,
);
const atualizarPerfilUsuario = new AtualizarPerfilUsuario(
  repositorioUsuarioPrisma,
  repositorioPerfil,
);
const atualizarSenha = new AtualizarSenha(
  repositorioUsuarioPrisma,
  provedorCriptografia,
);
const criarUsuario = new CriarUsuario(
  repositorioUsuarioPrisma,
  provedorCriptografia,
);
const habilitarUsuario = new HabilitarUsuario(repositorioUsuarioPrisma);
const desabilitarUsuario = new DesabilitarUsuario(repositorioUsuarioPrisma);
const logoutUsuario = new LogoutUsuario(
  repositorioUsuarioPrisma,
  queueRabbitMQ,
);

const obterUsuarios = new ObterUsuarios(repositorioUsuario);
const obterUsuarioPorId = new ObterUsuarioPorId(repositorioUsuarioPrisma);
const atualizarUsuario = new AtualizarUsuario(repositorioUsuarioPrisma);
const removerUsuarios = new RemoverUsuario(repositorioUsuarioPrisma);
const validarOtp = new ValidarOtp(
  repositorioUsuario,
  repositorioOtp,
  authToken,
  queueRabbitMQ,
);
const verificarOtpExiste = new VerificarOtpExiste(repositorioOtp);
const criarTokenParaQrCode = new CriarTokenParaQrCode(
  repositorioUsuario,
  repositorioOtp,
  authToken,
);
const obterTokenParaQrCode = new ObterTokenParaQrCode(
  repositorioOtp,
  authToken,
);
const removerTokenParaQrCode = new RemoverTokenParaQrCode(repositorioOtp);

const criarPermissao = new CriarPermissao(repositorioPermissaoPrisma);
const editarPermissao = new EditarPermissao(repositorioPermissaoPrisma);
const excluirPermissao = new ExcluirPermissao(
  repositorioPermissaoPrisma,
  repositorioPerfilPrisma,
);
const obterPermissoes = new ObterPermissoes(repositorioPermissaoPrisma);
const obterPermissaoPorId = new ObterPermissaoPorId(repositorioPermissaoPrisma);

const criarPerfil = new CriarPerfil(
  repositorioPerfilPrisma,
  repositorioPermissaoPrisma,
);
const editarPerfil = new EditarPerfil(
  repositorioPerfilPrisma,
  repositorioPermissaoPrisma,
);
const excluirPerfil = new ExcluirPerfil(
  repositorioPerfilPrisma,
  repositorioUsuarioPrisma,
);
const obterPerfis = new ObterPerfis(repositorioPerfilPrisma);
const obterPerfilPorId = new ObterPerfilPorId(repositorioPerfilPrisma);

// CONTROLLERS -------------------------------------------
new LoginUsuarioController(authRouter, loginUsuario);
new LoginPeloQrCodeController(authRouter, loginPeloQrCode);
new ValidarOtpController(authRouter, validarOtp);
new VerificarOtpExisteController(authRouter, verificarOtpExiste);
new RedefinirSenhaPorEmailController(authRouter, redefinirSenhaPorEmail);
new VerificarTokenRedefinicaoSenhaController(
  authRouter,
  verificarTokenRedefinicaoSenha,
);
new AtualizarSenhaPeloEmailTokenController(
  authRouter,
  atualizarSenhaPeloEmailToken,
);
new RegistrarUsuarioController(authRouter, registrarUsuario);
new AtualizarAccessRefreshTokensController(
  authRouter,
  atualizarAccessRefreshTokens,
);
new CriarTokenParaQrCodeController(
  authRouter,
  criarTokenParaQrCode,
  rotaProtegidaCookies,
);
// TODO: verificar a proteção da rota para usuario logado pode consultar apenas o seu token
new ObterTokenParaQrCodeController(
  authRouter,
  obterTokenParaQrCode,
  rotaProtegidaCookies,
);
new RemoverTokenParaQrCodeController(
  authRouter,
  removerTokenParaQrCode,
  rotaProtegidaCookies,
);
new AtualizarPerfilUsuarioController(
  authRouter,
  atualizarPerfilUsuario,
  rotaProtegida,
);
new AtualizarSenhaController(authRouter, atualizarSenha, rotaProtegida);
new CriarUsuarioController(authRouter, criarUsuario, rotaProtegida);
new HabilitarUsuarioController(authRouter, habilitarUsuario, rotaProtegida);
new DesabilitarUsuarioController(authRouter, desabilitarUsuario, rotaProtegida);
new LogoutUsuarioController(authRouter, logoutUsuario, rotaProtegidaCookies);

new ObterUsuariosController(authRouter, obterUsuarios, rotaProtegida);
new ObterUsuarioPorIdController(authRouter, obterUsuarioPorId, rotaProtegida);
new AtualizarUsuarioController(authRouter, atualizarUsuario, rotaProtegida);
new RemoverUsuarioController(authRouter, removerUsuarios, rotaProtegida);

new CriarPermissaoController(v1Router, criarPermissao, rotaProtegida);
new EditarPermissaoController(v1Router, editarPermissao, rotaProtegida);
new ExcluirPermissaoController(v1Router, excluirPermissao, rotaProtegida);
new ObterPermissaoPorIdController(v1Router, obterPermissaoPorId, rotaProtegida);
new ObterPermissoesController(v1Router, obterPermissoes, rotaProtegida);

new CriarPerfilController(v1Router, criarPerfil, rotaProtegida);
new EditarPerfilController(v1Router, editarPerfil, rotaProtegida);
new ExcluirPerfilController(v1Router, excluirPerfil, rotaProtegida);
new ObterPerfisController(v1Router, obterPerfis, rotaProtegida);
new ObterPerfilPorIdController(v1Router, obterPerfilPorId, rotaProtegida);
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
