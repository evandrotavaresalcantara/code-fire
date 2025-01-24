import { Formatter } from "../../../src/core/utils";

test("Can be return only Numbers with length is string", () => {
  const case1 = "123456";
  const case2 = " 12Test3Case4 56 ";

  expect(Formatter.getDigits()).toBe("");
  expect(Formatter.getDigits(case1)).toBe("123456");
  expect(Formatter.getDigits(case1, 4)).toBe("1234");
  expect(Formatter.getDigits(case2)).toBe("123456");
  expect(Formatter.getDigits(case2, 4)).toBe("1234");
});
test("Can be return only Numbers is string", () => {
  const case1 = "123456";
  const case2 = " 12Test3Case45 6 ";

  expect(Formatter.getFullDigits()).toBe("");
  expect(Formatter.getFullDigits(case1)).toBe("123456");
  expect(Formatter.getFullDigits(case2)).toBe("123456");
});
test("Can be convert Number INTL in number pt-BR format with 2 decimal places", () => {
  const n1 = 1234;
  const n2 = 12.35;
  const n3 = 10;
  const n4 = 1789542.9;
  expect(Formatter.moneyNumberToDisplay(n1)).toBe("1.234,00");
  expect(Formatter.moneyNumberToDisplay(n2)).toBe("12,35");
  expect(Formatter.moneyNumberToDisplay(n3)).toBe("10,00");
  expect(Formatter.moneyNumberToDisplay(n4)).toBe("1.789.542,90");
});
test("Can be convert Number INTL in number Currency BRL", () => {
  const n1 = 1234;
  const n2 = 12.35;
  const n3 = 10;
  const n4 = 1789542.9;
  // expect(Formatter.moneyNumberToDisplayCurrencyBRL(n1)).toBe("R$ 1.234,00")
  expect(
    Formatter.moneyNumberToDisplayCurrencyBRL(n1).replace(/\s/g, "")
  ).toStrictEqual("R$ 1.234,00".replace(/\s/g, ""));
  expect(
    Formatter.moneyNumberToDisplayCurrencyBRL(n2).replace(/\s/g, "")
  ).toStrictEqual("R$ 12,35".replace(/\s/g, ""));
  expect(
    Formatter.moneyNumberToDisplayCurrencyBRL(n3).replace(/\s/g, "")
  ).toStrictEqual("R$ 10,00".replace(/\s/g, ""));
  expect(
    Formatter.moneyNumberToDisplayCurrencyBRL(n4).replace(/\s/g, "")
  ).toStrictEqual("R$ 1.789.542,90".replace(/\s/g, ""));
});
test("Can be convert NumberString pt-BR in number INTL", () => {
  const n1 = "1.234,00 ";
  const n2 = "12,35";
  const n3 = " 10,00 ";
  const n4 = "1.789.542,90";
  const n5 = "";
  const n6 = undefined;
  const n7 = "010";
  const n8 = "12,3";
  const n9 = "12,389";
  const n10 = "12,382";
  const n11 = "12,385";
  const n12 = "12,386";
  expect(Formatter.moneyStringToStore(n1)).toBe(1234);
  expect(Formatter.moneyStringToStore(n2)).toBe(12.35);
  expect(Formatter.moneyStringToStore(n3)).toBe(10);
  expect(Formatter.moneyStringToStore(n4)).toBe(1789542.9);
  expect(Formatter.moneyStringToStore(n5)).toBe(0);
  expect(Formatter.moneyStringToStore(n6)).toBe(0);
  expect(Formatter.moneyStringToStore(n7)).toBe(10);
  expect(Formatter.moneyStringToStore(n8)).toBe(12.3);
  expect(Formatter.moneyStringToStore(n9)).toBe(12.39);
  expect(Formatter.moneyStringToStore(n10)).toBe(12.38);
  expect(Formatter.moneyStringToStore(n11)).toBe(12.38);
  expect(Formatter.moneyStringToStore(n12)).toBe(12.39);
});
test("Can be apply mask in CNPJ string", () => {
  const cnpj = "01123123000124";
  const cnpjFull = "01.123.123/0001-24";
  const cnpj1 = "0112312300012499";
  const cnpj2 = " 01123123000124 ";
  const cnpj3 = "0";
  const cnpj4 = "01";
  const cnpj5 = "011";
  const cnpj6 = "0112";
  const cnpj7 = "01123";
  const cnpj8 = "011231";
  const cnpj9 = "0112312";
  const cnpj10 = "01123123";
  const cnpj11 = "011231230";
  const cnpj12 = "0112312300";
  const cnpj13 = "011231230001";
  const cnpj14 = "0112312300012";
  expect(Formatter.formatCNPJToDisplay(cnpj)).toStrictEqual(
    "01.123.123/0001-24"
  );
  expect(Formatter.formatCNPJToDisplay(cnpjFull)).toStrictEqual(
    "01.123.123/0001-24"
  );
  expect(Formatter.formatCNPJToDisplay(cnpj1)).toStrictEqual(
    "01.123.123/0001-24"
  );
  expect(Formatter.formatCNPJToDisplay(cnpj2)).toStrictEqual(
    "01.123.123/0001-24"
  );
  expect(Formatter.formatCNPJToDisplay(cnpj3)).toStrictEqual("0");
  expect(Formatter.formatCNPJToDisplay(cnpj4)).toStrictEqual("01");
  expect(Formatter.formatCNPJToDisplay(cnpj5)).toStrictEqual("01.1");
  expect(Formatter.formatCNPJToDisplay(cnpj6)).toStrictEqual("01.12");
  expect(Formatter.formatCNPJToDisplay(cnpj7)).toStrictEqual("01.123");
  expect(Formatter.formatCNPJToDisplay(cnpj8)).toStrictEqual("01.123.1");
  expect(Formatter.formatCNPJToDisplay(cnpj9)).toStrictEqual("01.123.12");
  expect(Formatter.formatCNPJToDisplay(cnpj10)).toStrictEqual("01.123.123");
  expect(Formatter.formatCNPJToDisplay(cnpj11)).toStrictEqual("01.123.123/0");
  expect(Formatter.formatCNPJToDisplay(cnpj12)).toStrictEqual("01.123.123/00");
  expect(Formatter.formatCNPJToDisplay(cnpj13)).toStrictEqual(
    "01.123.123/0001"
  );
  expect(Formatter.formatCNPJToDisplay(cnpj14)).toStrictEqual(
    "01.123.123/0001-2"
  );
});
test("Can be apply mask in CPF string", () => {
  const cpf = "01234567890";
  const cpfFull = "012.345.678-90";
  const cpf2 = " 01234567890 ";
  expect(Formatter.formatCNPJToDisplay(cpf)).toStrictEqual("012.345.678-90");
  expect(Formatter.formatCNPJToDisplay(cpfFull)).toStrictEqual(
    "012.345.678-90"
  );
  expect(Formatter.formatCNPJToDisplay(cpf2)).toStrictEqual("012.345.678-90");
});
test("Can be remove accents in string", () => {
  const case1 =
    "Mãe o segredo não está no que você diz, mas é na maneira como você diz, já dizia a Vovó e o Vovô em uma ação.";
  const case2 = "";
  expect(Formatter.removeAccents(case1)).toStrictEqual(
    "Mae o segredo nao esta no que voce diz, mas e na maneira como voce diz, ja dizia a Vovo e o Vovo em uma acao."
  );
  expect(Formatter.removeAccents(case2)).toStrictEqual("");
});
test("Can be convert to Slug Uppercase", () => {
  const case1 = "São Carlos do Ivaí";
  const case2 = " São Carlos do Ivaí ";
  expect(Formatter.textToSlugUpper(case1)).toStrictEqual("SAO CARLOS DO IVAI");
  expect(Formatter.textToSlugUpper(case2)).toStrictEqual("SAO CARLOS DO IVAI");
});
test("Can be convert to Slug Lowercase", () => {
  const case1 = "São Carlos do Ivaí";
  const case2 = " São Carlos do Ivaí ";
  expect(Formatter.textToSlugLower(case1)).toStrictEqual("sao_carlos_do_ivai");
  expect(Formatter.textToSlugLower(case2)).toStrictEqual("sao_carlos_do_ivai");
});
test("Can be apply mask in number currency", () => {
  const n1 = 1234;
  const n2 = "1.234,00 ";
  const n3 = " 10,00 ";
  const n4 = "17895429";
  const n5 = "178954290";
  const n6 = "5";
  const n7 = "57";
  const n8 = " 5Test7 Case";
  const n9 = "";

  expect(Formatter.maskCurrency(n1)).toStrictEqual("12,34");
  expect(Formatter.maskCurrency(n2)).toStrictEqual("1.234,00");
  expect(Formatter.maskCurrency(n3)).toStrictEqual("10,00");
  expect(Formatter.maskCurrency(n4)).toStrictEqual("178.954,29");
  expect(Formatter.maskCurrency(n5)).toStrictEqual("1.789.542,90");
  expect(Formatter.maskCurrency(n6)).toStrictEqual("0,05");
  expect(Formatter.maskCurrency(n7)).toStrictEqual("0,57");
  expect(Formatter.maskCurrency(n8)).toStrictEqual("0,57");
  expect(Formatter.maskCurrency(n9)).toStrictEqual("");
});
test("Can be apply mask in cep number", () => {
  const cepNull = null;
  const cepUndefined = undefined;
  const cep = 14093040;
  const cepFull = "14093-040";

  expect(Formatter.maskCep(cepNull)).toBe("");
  expect(Formatter.maskCep(cepUndefined)).toBe("");
  expect(Formatter.maskCep(cep)).toBe("14093-040");
  expect(Formatter.maskCep(cepFull)).toBe("14093-040");
});
test("Can be apply mask in date number", () => {
  const date = "01012024";
  const dateHalf = "01/012024";
  const dateHalf2 = "0101/2024";
  const dateFull = "01/01/2024";

  expect(Formatter.maskDate(date)).toBe("01/01/2024");
  expect(Formatter.maskDate(dateHalf)).toBe("01/01/2024");
  expect(Formatter.maskDate(dateHalf2)).toBe("01/01/2024");
  expect(Formatter.maskDate(dateFull)).toBe("01/01/2024");
});
test("Can be apply mask in telephone number", () => {
  const telCel = 16996301122;
  const telCelFull = "(16) 99630-1122";
  const telFix = "1133445566";
  const telFixFull = "(11) 3344-5566";

  expect(Formatter.maskTelephone(telCel)).toBe("(16) 99630-1122");
  expect(Formatter.maskTelephone(telCelFull)).toBe("(16) 99630-1122");

  expect(Formatter.maskTelephone(telFix)).toBe("(11) 3344-5566");
  expect(Formatter.maskTelephone(telFixFull)).toBe("(11) 3344-5566");
});

test("should be transform Date to DateDB-Django", () => {
  const now = new Date();
  const formattedDate = Formatter.formatDate(now);
  expect(formattedDate).toMatch(
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{6}$/
  );
});

test("sould be convert first letter to Uppercase", () => {
  const string1 = "example";
  const string2 = "test example";
  const string3 = "";
  const string4 = undefined;
  expect(Formatter.capitalizeFirstLetter(string1)).toBe("Example");
  expect(Formatter.capitalizeFirstLetter(string2)).toBe("Test example");
  expect(Formatter.capitalizeFirstLetter(string3)).toBe("");
  expect(Formatter.capitalizeFirstLetter(string4)).toBe("");
});
