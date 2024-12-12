import { Id } from "common"
import { Permissao } from "../../src/model"
import { RepositorioPermissaoMock } from "../mock/RepositorioPermissaoMock"


test('salvar um usuário', async ()=>{
    const novoid = new Id()
    const permissao = {nome: "criar", descricao: 'criacao'}
    const novaPermissao = new Permissao(permissao)
    const novaPermissaoComPers = novaPermissao.clonar({id: novoid.valor})
    const repoPermissao = new RepositorioPermissaoMock()
    await repoPermissao.criarPermissao(novaPermissao)
    expect(repoPermissao.obterPermissaoPorId(novaPermissaoComPers.id)).toBeDefined()
})