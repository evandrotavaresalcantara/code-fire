import { axiosApi } from "../../config";

const ENDPOINT = "/auth/login";

test("Deve enviar um email e senha retornar status 400", async () => {
  const data = {
    email: "usuarioteste@emailteste.com",
    senha: "123",
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(400);
});
