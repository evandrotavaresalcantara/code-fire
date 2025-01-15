import Celular from "../../src/model/Celular";

test("Deve criar um número de celular válido", () => {
  const numeroCelular = "81986523695";
  const celular = new Celular(numeroCelular);
  expect(celular.semMascara).toBe(numeroCelular);
});

test("Deve retornar um número com máscara", () => {
  const numeroCelular = "81986523695";
  const numeroCelularComMascara = "(81) 9 8652-3695";
  const celular = new Celular(numeroCelular);
  expect(celular.comMascara).toBe(numeroCelularComMascara);
});

test("Deve validar um número de celular", () => {
  const numeroCelular = "81986523695";
  expect(Celular.isValido(numeroCelular)).toBe(true);
});

test("Deve lançar erro ao criar um número de celular inválido", () => {
  const msg = "número de celular inválido.";
  expect(() => new Celular(undefined)).toThrow(msg);
  expect(() => new Celular("")).toThrow(msg);
  expect(() => new Celular("34698857")).toThrow(msg);
  expect(() => new Celular("811987586585")).toThrow(msg);
});
