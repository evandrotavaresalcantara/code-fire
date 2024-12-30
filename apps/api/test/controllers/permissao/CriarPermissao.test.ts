import axios from "axios";
import { axiosApi } from "../../config";

test("Deve criar uma nova permissão", async () => {
  const ENDPOINT = "http://localhost:4000/v1/permissoes";
  const data = {
    nome: "permissaoteste",
    descricao: "descricaoteste",
  };
  const response = await axios.post(ENDPOINT, data);
  expect(response.status).toBe(201);
});

test("Deve criar uma nova permissão", async () => {
  const ENDPOINT = "/permissoes";
  const data = {
    nome: "permissaotestee",
    descricao: "descricaotestee",
  };
  const response = await axiosApi.post(ENDPOINT, data);
  expect(response.status).toBe(201);
});
