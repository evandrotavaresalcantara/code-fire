import SenhaForte from "../../../src/model/obj-valor/SenhaForte";
//Requesitos da Senha:
// Ter no mínimo 6 caracteres.
// Conter pelo menos uma letra minúscula.
// Conter pelo menos uma letra maiúscula.
// Conter pelo menos um número.
// Conter pelo menos um dos seguintes caracteres especiais: !@#$%^&*(),.?":{}|<>

const errPadrao = "senha inválida.";

test("Deve lançar erro com senha vazia", () => {
  expect(() => new SenhaForte("")).toThrow(errPadrao);
});

test("Deve lançar erro com senha apenas com números", () => {
  expect(() => new SenhaForte("1234567890")).toThrow(errPadrao);
});

test("Deve lançar erro com senha apenas com letras", () => {
  expect(() => new SenhaForte("AbCdEfGhIj")).toThrow(errPadrao);
});

test("Deve lançar erro com senha apenas com caracteres especiais", () => {
  expect(() => new SenhaForte("!@#$%¨&*()_+")).toThrow(errPadrao);
});

test("Deve lançar erro com senha com menos de 6 caracteres", () => {
  expect(() => new SenhaForte("%S3nh")).toThrow(errPadrao);
});

test("Deve criar senha forte", () => {
  const senha = "S3nh4F0rt3%";
  expect(new SenhaForte(senha).valor).toBe(senha);
});

test("Deve validar senha forte", () => {
  expect(SenhaForte.isValida("123456")).toBeFalsy();
  expect(SenhaForte.isValida("S3nh4F0rt3%")).toBeTruthy();
});
