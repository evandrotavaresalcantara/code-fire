import Telefone from "../../src/model/Telefone";

test("Deve criar um número de telefone telefone válido ", () => {
  const telefoneTelefone = "(81) 9 1234-4494";
  const telefone = new Telefone(telefoneTelefone);
  expect(telefone.semMascara).toBe(telefone.semMascara);
});

test("Deve criar um número de fixo válido", () => {
  const telefoneFixo = "8131231234";
  const fixo = new Telefone(telefoneFixo);
  expect(fixo.semMascara).toBe(telefoneFixo);
});

test("Deve retornar um telefone telefone com máscara", () => {
  const telefoneTelefone = "81986523695";
  const telefoneTelefoneComMascara = "(81) 9 8652-3695";
  const telefone = new Telefone(telefoneTelefone);
  expect(telefone.comMascara).toBe(telefoneTelefoneComMascara);
});

test("Deve retornar um telefone fixo com máscara", () => {
  const telefoneFixo = "8131231234";
  const telefoneFixoComMascara = "(81) 3123-1234";
  const fixo = new Telefone(telefoneFixo);
  expect(fixo.comMascara).toBe(telefoneFixoComMascara);
});

test("Deve validar um número de telefone", () => {
  const telefoneTelefone = "81986523695";
  expect(Telefone.isValido(telefoneTelefone)).toBe(true);
});

test("Deve validar um número de telefone", () => {
  const telefoneFixo = "8131231234";
  expect(Telefone.isValido(telefoneFixo)).toBe(true);
});

test("Deve lançar erro ao criar um número de telefone inválido", () => {
  const msg = "Dados Inválidos: número do telefone inválido.";
  expect(() => new Telefone("14698857")).toThrow(msg);
  expect(() => new Telefone("811987586585")).toThrow(msg);
});

test("Deve lançar erro ao criar um número de telefone vázio", () => {
  const msg = "Dados Inválidos: número de telefone não preenchido.";
  expect(() => new Telefone(undefined)).toThrow(msg);
  expect(() => new Telefone("")).toThrow(msg);
});
