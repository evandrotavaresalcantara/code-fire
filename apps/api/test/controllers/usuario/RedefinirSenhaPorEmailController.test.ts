import { axiosApi } from "../../config";

const ENDPOINT = "/auth/recuperar-por-email";

test("Deve enviar um email e retornar status 204", async () => {
  const data = {
    email: "usuarioteste@emailteste.com",
    baseUrl: "http://localhost:3000/accounts/recovery",
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(204);
});
