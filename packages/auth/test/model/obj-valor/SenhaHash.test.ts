import SenhaHash from "../../../src/model/obj-valor/SenhaHash";

const errPadrao = "hash inválido.";

test("Deve gerar erro ao tentar criar hash apenas com números", () => {
  expect(() => new SenhaHash("1234567890")).toThrow(errPadrao);
});

test("Deve gerar erro ao tentar criar hash apenas com letras", () => {
  expect(() => new SenhaHash("AbCdEfGhIj")).toThrow(errPadrao);
});

test("Deve gerar erro ao tentar criar hash apenas com caracteres especiais", () => {
  expect(() => new SenhaHash("!@#$%¨&*()_+")).toThrow(errPadrao);
});

test("Deve gerar erro ao tentar criar um hash com menos de 8 caracteres", () => {
  expect(() => new SenhaHash("%S3nh4%")).toThrow(errPadrao);
});

test("Deve gerar erro ao tentar criar um hash com valor undefined", () => {
  expect(() => new SenhaHash(undefined)).toThrow(errPadrao);
});

test("Deve criar senha com hash válido", () => {
  const hashs = [
    "$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6",
    "$2a$08$7uZhkstRVOk84If8gt0r4eWih3nfGdWduZpIcj1MzNJiS.UgIEF7.",
    "$2a$13$VHgPnA1ymVG3QsTyCZ8GG.IfZ4jljSbI/MSgRSx6Tbj2jXxfgdjoC",
    "$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq",
  ];

  expect(new SenhaHash(hashs[0])).toBeDefined();
  expect(new SenhaHash(hashs[1])).toBeDefined();
  expect(new SenhaHash(hashs[2])).toBeDefined();
  expect(new SenhaHash(hashs[3])).toBeDefined();
});

test("Deve validar senha hash", () => {
  expect(SenhaHash.isValida("123456")).toBeFalsy();
  expect(SenhaHash.isValida("S3nh4F0rt3%")).toBeFalsy();
  expect(
    SenhaHash.isValida(
      "$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6",
    ),
  ).toBeTruthy();
});
