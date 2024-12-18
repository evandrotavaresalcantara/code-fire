import { Perfil, Permissao } from "../../../src"
import ExcluirPermissao from "../../../src/usecases/permissao/ExcluirPermissao"
import { ObterPermissoes } from "../../../src/usecases/permissao/ObterPermissoes"
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock"
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock"

const permissao1 = { nome: 'vizualizar', descricao: 'vizualização' }
const permissao2 = { nome: 'adicionar', descricao: 'inclusão' }
const permissao3 = { nome: 'editar', descricao: 'edição' }
const permissao4 = { nome: 'excluir', descricao: 'exclusão' }

test('Deve obter as permissões', async () => {
    const novaPermissao1 = new Permissao(permissao1)
    const novaPermissao2 = new Permissao(permissao2)
    const novaPermissao3 = new Permissao(permissao3)
    const novaPermissao4 = new Permissao(permissao4)

    const repo = new RepositorioPermissaoMock([novaPermissao1, novaPermissao2, novaPermissao3, novaPermissao4])
    const casoDeUso = new ObterPermissoes(repo)

    const permissoes = await casoDeUso.executar()

    expect(permissoes).toHaveLength(4)
})
