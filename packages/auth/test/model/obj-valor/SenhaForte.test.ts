import SenhaForte from "../../../src/model/obj-valor/SenhaForte"

const errPadrao = "senha fraca."

test("Deve lançar erro com senha vazia", () => {
    expect(() => new SenhaForte("")).toThrow(errPadrao)
})

test("Deve lançar erro com senha apenas com números", () => {
    expect(() => new SenhaForte("1234567890")).toThrow(errPadrao)
})

test("Deve lançar erro com senha apenas com letras", () => {
    expect(() => new SenhaForte("AbCdEfGhIj")).toThrow(errPadrao)
})

test("Deve lançar erro com senha apenas com caracteres especiais", () => {
    expect(() => new SenhaForte("!@#$%¨&*()_+")).toThrow(errPadrao)
})

test("Deve lançar erro com senha com menos de 8 caracteres", () => {
    expect(() => new SenhaForte("%S3nh4%")).toThrow(errPadrao)
})

test("Deve criar senha forte", () => {
    const senha = "S3nh4F0rt3%"
    expect(new SenhaForte(senha).valor).toBe(senha)
})

test("Deve validar senha forte", () => {
    expect(SenhaForte.isValida("123456")).toBeFalsy()
    expect(SenhaForte.isValida("S3nh4F0rt3%")).toBeTruthy()
})