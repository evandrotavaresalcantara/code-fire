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
  expect(otp.getCodigo()).toHaveLength(6);
  expect(expired).toBeGreaterThan(new Date().getTime() + 1000 * 60 * 9);
  expect(expired).toBeLessThan(new Date().getTime() + 1000 * 60 * 11);
});

test("Deve validar que otp codigo correto", () => {
  const otp = Otp.create("usuario@email.com");
  expect(otp.isValid(otp.getCodigo())).toBeTruthy();
});

test("Deve invalidar que otp codigo incorreto", () => {
  const otp = Otp.create("usuario@email.com");
  expect(otp.isValid(otp.getCodigo())).toBeTruthy();
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
