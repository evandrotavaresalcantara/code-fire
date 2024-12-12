import Permissao from "../../src/model/Permissao"

test('Deve criar uma permissão', ()=>{
    const permissaoCompleta = {nome: "criar", descricao: 'criacao'}
    const novaPermissao = new Permissao(permissaoCompleta)
    expect(novaPermissao.nome.nome).toBe(permissaoCompleta.nome)
})

test('Deve criar uma permissão com a propriedade ativo verdadeiro', ()=>{
    const permissaoCompletaStatusVerdadeiro = {nome: "criar", descricao: 'criação', ativo: true}
    const novaPermissao = new Permissao(permissaoCompletaStatusVerdadeiro)
    expect(novaPermissao.ativo).toBeTruthy()
})

test('Deve criar uma permissão com a propriedade ativo falsa', ()=>{
    const permissaoCompletaSatusFalse = {nome: "editar", descricao: 'edição', ativo: false}
    const novaPermissao = new Permissao(permissaoCompletaSatusFalse)
    expect(novaPermissao.ativo).toBe(false)
})