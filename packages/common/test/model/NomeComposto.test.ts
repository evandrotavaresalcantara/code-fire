import NomePessoa from "../../src/model/NomePessoa"

test("Deve lançar erro ao tentar criar nomeComposto vazio", () => {
    expect(() => new NomePessoa({})).toThrow()
    expect(() => new NomePessoa({ valor: "" })).toThrow()
    expect(() => new NomePessoa({ valor: undefined })).toThrow()
})

test("Deve lançar erro ao tentar criar nomeComposto sem a chave 'valor'", () => {
    expect(() => new NomePessoa({})).toThrow("valor inválido.");
});


test("Deve criar um nome sem sobrenome", () => {
    const nomePessoa = { valor: "João" }
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.existeSobrome).toBe(false)
    expect(novoNomePessoa.sobrenomes).toEqual([])
})

test("Deve criar um nome com sobrenome", () => {
    const nomePessoa = { valor: "João da Silva" }
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.existeSobrome).toBe(true)
})

test("Deve exibir o primeiro nome ", () => {
    const nomePessoa = { valor: "João da Silva" }
    const primeiroNome = "João"
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.primeiroNome).toEqual(primeiroNome)
})

test("Deve exibir os sobrenomes ", () => {
    const nomePessoa = { valor: "João da Silva" }
    const sobrenomes = ["da", "Silva"]
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.sobrenomes).toEqual(sobrenomes)
})

test("Deve exibir o último sobrenome ", () => {
    const nomePessoa = { valor: "João da Silva" }
    const ultimoSobrenome = "Silva"
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.ultimoSobrenome).toBe(ultimoSobrenome)
})

test("Deve lançar erro ao tentar criar nome com caracteres especiais", () => {
    const nomePessoa = { valor: "João @OOOJoao" }
    expect(() => new NomePessoa(nomePessoa)).toThrow("")
})

test("Deve criar nome com apostrofo", () => {
    const nomePessoa = { valor: "João D'Ávila" }
    const nomeCompleto = "João D'Ávila"
    const nomeComposto = new NomePessoa(nomePessoa)
    expect(nomeComposto.nome).toBe(nomeCompleto)
})

test("Deve exibir inicias do primeiro nome e último sobrenom", () => {
    const nomePessoa = { valor: "João Medeiro Silva" }
    const iniciais = "JS"
    const novoNomePessoa = new NomePessoa(nomePessoa)
    expect(novoNomePessoa.iniciais).toBe(iniciais)
})