import Nome from "../../src/model/Nome"

test("Deve retornar o nome", () => {
    const nome = { valor: "criar", minimo: 3, maximo: 10 }
    const novoNome = new Nome(nome)
    expect(novoNome.nome).toBe(nome.valor)
})

test("Deve retornar o um único nome, mesmo passando valores com espaço", () => {
    const nomeComEspacao = { valor: "criar projeto", minimo: 3, maximo: 20 }
    const novoNome = new Nome(nomeComEspacao)
    expect(novoNome.nome).toBe(nomeComEspacao.valor.trim())
})

test('Deve cria um nome mesmo sem passar o valor mínimo e máximo', () => {
    const nomeSemMinMax = { valor: 'Nome' }
    const novoNome = new Nome(nomeSemMinMax)
    expect(novoNome.nome).toBe(nomeSemMinMax.valor)
})
test("Deve lançar erro com nome vazio ou undefined", () => {
    const nomeValorUndefined = { valor: undefined, minimo: 3, maximo: 10 }
    expect(() => new Nome({})).toThrow()
    expect(() => new Nome(nomeValorUndefined)).toThrow()
})

test('Deve lançar um erro quando o minimo for undefined', () => {
    const nomeMinimoUndefined = { valor: 'Nome', minimo: undefined, maximo: 10 }
    expect(() => new Nome(nomeMinimoUndefined))
})

test('Deve lançar um erro quando o maximo for undefined', () => {
    const nomeMinimoUndefined = { valor: 'Nome', minimo: 3, maximo: undefined }
    expect(() => new Nome(nomeMinimoUndefined))
})

test("Deve lançar erro com nome muito pequeno", () => {
    const nomePequeno = { valor: "cr", minimo: 3, maximo: 10 }
    expect(() => new Nome(nomePequeno)).toThrow()
})

test("Deve lançar erro com nome muito grande", () => {
    const nomeGrande = { valor: "abcdefghijlmnopqrstuvwzyz", minimo: 3, maximo: 10 }
    expect(() => new Nome(nomeGrande)).toThrow()
})