import { Usuario } from "../../../src/model/index";
import { RedefinirSenhaPorEmail } from "../../../src/usecases/index";
import { Queue, RabbitMQAdapter } from "@packages/queue/src";
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock";

let queue: Queue;

beforeAll(() => {
  queue = RabbitMQAdapter.getInstance();
});

afterAll(async () => {
  await queue.disconnect();
});

test("Deve colocar na fila para envio de email a solicitação do usuário redefinir senha por seu e-mail", async () => {
  const usuarioComHash = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    telefone: "81911112222",
    senha: "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm",
    urlPerfil: "http://imagens.io/fire.png",
  };
  const novoUsuario = new Usuario(usuarioComHash);
  const repositorioUsuario = new RepositorioUsuarioMock([novoUsuario]);
  const usecase = new RedefinirSenhaPorEmail(repositorioUsuario, queue);
  const input = {
    email: novoUsuario.getEmail(),
    baseUrl: "http://localhost:3000/accounts/recovery",
  };
  const output = await usecase.executar(input);
  expect(output).toBeUndefined();
});
