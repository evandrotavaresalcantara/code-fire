import { Permissao } from "../../../src"
import CriarPermissao from "../../../src/usecases/permissao/CriarPermissao"
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock"

const permissao1 = { nome: 'vizualizar', descricao: 'vizualização' }

test('Deve criar uma nova permissão', async () =>{
    const repo = new RepositorioPermissaoMock()
    const casoDeUso = new CriarPermissao(repo)

    await casoDeUso.executar(permissao1)
    const permissaoSalva = await repo.obterPermissaoPorNome(permissao1.nome)
    expect(permissaoSalva?.getDescricaoPermissao()).toEqual(permissao1.descricao)
})

test('Deve gerar um erro ao tentar criar um nova permissão com nome já existente', async () =>{
    const repo = new RepositorioPermissaoMock()
    const casoDeUso = new CriarPermissao(repo)

    await casoDeUso.executar(permissao1)
    expect(async () =>{
        await casoDeUso.executar(permissao1)
    }).rejects.toThrow('nome da permissão já existe.')
})