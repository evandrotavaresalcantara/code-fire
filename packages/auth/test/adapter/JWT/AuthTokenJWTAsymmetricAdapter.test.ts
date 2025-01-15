import { AuthTokenJWTAsymmetricAdapter } from "../../../src/adapter";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("Deve gerar um token jwt", () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const payload = { userId: "1234", role: "admin" };
  const token = authToken.create(payload, "1h");
  expect(token).toBeDefined();
});

test("Deve validar um token jwt com chave publica", () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const payload = { userId: "1234", role: "admin" };
  const token = authToken.create(payload, "1h");
  const isValidJWT = authToken.verify(token);
  expect(isValidJWT).toBeTruthy();
});

test("Deve invalidar um token invalido jwt com chave publica", () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  // const payload = { userId: "1234", role: "admin" };
  // const token = authToken.create(payload, "1h");
  const isValidJWT = authToken.verify("casdasdqwe3432423432dfdsff23434dsds");
  expect(isValidJWT).toBeFalsy();
});

test("Deve invalidar um token expirado jwt com chave publica", async () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const payload = { userId: "1234", role: "admin" };
  const token = authToken.create(payload, "1s");
  jest.advanceTimersByTime(2000);
  const isValidJWT = authToken.verify(token);
  expect(isValidJWT).toBeFalsy();
});

test("Deve decodificar um token jwt", () => {
  const authToken = new AuthTokenJWTAsymmetricAdapter();
  const payload = { userId: "1234", role: "admin" };
  const token = authToken.create(payload, "1m");
  const tokenDecoded = authToken.decode(token) as {
    userId: string;
    role: string;
    iat: number;
    exp: number;
  };
  expect(tokenDecoded).toBeDefined();
  expect(tokenDecoded.userId).toBe("1234");
  expect(tokenDecoded.role).toBe("admin");
  expect(tokenDecoded.exp).toBe(tokenDecoded.iat + 60);
});
