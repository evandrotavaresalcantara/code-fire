import { Otp } from "@/model";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("Deve criar um objeto Otp válido", () => {
  const otp = Otp.create("usuario@email.com");
  const expired = otp.getExpiredAt().getTime();
  expect(otp).toBeInstanceOf(Otp);
  expect(otp.getEmail()).toBe("usuario@email.com");
  expect(otp.getCodigo()).toHaveLength(6);
  expect(otp.getCodigoHash()).toHaveLength(64);
  expect(expired).toBeGreaterThan(new Date().getTime() + 1000 * 60 * 9);
  expect(expired).toBeLessThan(new Date().getTime() + 1000 * 60 * 11);
});

test("Deve validar que otp codigo correto", () => {
  const otp = Otp.create("usuario@email.com");
  expect(otp.isValid(otp.getCodigo())).toBeTruthy();
});

test("Deve invalidar que otp codigo incorreto", () => {
  const otp = Otp.create("usuario@email.com");
  const otp2 = Otp.create("usuario@email.com");
  expect(otp.isValid(otp2.getCodigo())).toBeFalsy();
});

test("Deve validar que otp não expirou", () => {
  const otp = Otp.create("usuario@email.com");
  jest.advanceTimersByTime(10 * 60 * 1000); // Avança 10 minutos
  expect(otp.isValid(otp.getCodigo())).toBeTruthy();
});

test("Deve invalidar otp expirou", () => {
  const otp = Otp.create("usuario@email.com");
  jest.advanceTimersByTime(11 * 60 * 1000); // Avança 11 minutos
  expect(otp.isValid(otp.getCodigo())).toBeFalsy();
});

test("Deve gerar rawToken com tamanhos diferentes", () => {
  const rawToken1 = Otp.generateToken();
  const rawToken2 = Otp.generateToken(48);
  expect(rawToken1).toHaveLength(24);
  expect(rawToken2).toHaveLength(96);
});

test("Deve gerar hashToken", () => {
  const rawToken1 = Otp.generateToken();
  const hashToken1 = Otp.hashToken(rawToken1);
  const rawToken2 = Otp.generateToken(48);
  const hashToken2 = Otp.hashToken(rawToken2);
  expect(hashToken1).toHaveLength(64);
  expect(hashToken2).toHaveLength(64);
  expect(hashToken1).not.toEqual(hashToken2);
});

test("Deve verificar se um rawToken é o mesmo de um hashToken", () => {
  const rawToken = Otp.generateToken(48);
  const hashToken = Otp.hashToken(rawToken);
  const isEqual = Otp.verifyTokenHash(rawToken, hashToken);
  expect(isEqual).toBeTruthy();
});

test("Deve verificar que um rawToken não é o mesmo de um hashToken", () => {
  const rawToken = Otp.generateToken(48);
  const hashToken = Otp.hashToken(rawToken);
  const rawToken2 = Otp.generateToken(48);
  const isEqual = Otp.verifyTokenHash(rawToken2, hashToken);
  expect(isEqual).toBeFalsy();
});
