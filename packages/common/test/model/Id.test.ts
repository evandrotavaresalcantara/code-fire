import  Id  from "../../src/model/Id"

test('Deve gerar novo Id sem receber uuid', () => {
    const id1 = new Id()
    expect(Id.isValido(id1.uuid)).toBeTruthy()
    expect(id1.uuid).toHaveLength(36)
})

test('Deve gerar novo Id recebendo uuid válido', () => {
    const uuidValido = Id.novo.uuid
    const id1 = new Id(uuidValido)
    expect(Id.isValido(id1.uuid)).toBeTruthy()
    expect(id1.uuid).toHaveLength(36)
})

test('Deve gerar um erro ao tentar cria um uuid com valor inválido', () => {
    expect(() => new Id('aaa-bbb-ccc')).toThrow(new Error('Id inválido.'))
})

test('Deve testar igualdade do uuid dos ids utilizando o método igual', ()=>{
    const id1 = Id.novo
    const id2 = new Id(id1.uuid)
    expect(id1.igual(id2)).toBeTruthy()
})

test('Deve confirmar a diferença do uuid dos ids utilizando o método diferente', ()=>{
    const id1 = Id.novo
    const id2 = new Id()
    expect(id1.diferente(id2)).toBeTruthy()
})