import Email from "../../src/model/Email";

test("Deve criar um email válido", () => {
  const enderecoEmail = "dev@codefire.io";
  const email = new Email(enderecoEmail);
  expect(email.valor).toBe(enderecoEmail);
});

test("Deve retornar o nome antes do @", () => {
  const enderecoEmail = "dev@codefire.io";
  const nome = "dev";
  const email = new Email(enderecoEmail);
  expect(email.nome).toBe(nome);
});

test("Deve validar email", () => {
  const enderecoEmail = "dev@codefire.io";
  expect(Email.isValido(enderecoEmail)).toBeTruthy();
  expect(Email.isValido("usuario@email")).toBeFalsy();
});

test("Deve lançar erro ao criar um email inválido", () => {
  const msg = "e-mail inválido.";
  expect(() => new Email(undefined)).toThrow(msg);
  expect(() => new Email("")).toThrow(msg);
  expect(() => new Email("dev")).toThrow(msg);
  expect(() => new Email("dev@io")).toThrow(msg);
});
