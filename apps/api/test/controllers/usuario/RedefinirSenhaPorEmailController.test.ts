import { axiosApi } from "../../config";
import usuarioToken from "../usuarioToken";

const ENDPOINT = "/auth/recuperar-por-email";

test("Deve enviar um email e retornar status 204", async () => {
  const token = await usuarioToken.token();
  const data = {
    email: "usuarioteste@emailteste.com",
    baseUrl: "http://localhost:3000/accounts/recovery",
  };
  const response = await axiosApi.post(ENDPOINT, data, {
    headers: { Authorization: token },
  });

  await usuarioToken.excluirUsuario();
  expect(response.status).toBe(204);
});
