import { Id } from "common"
import { Perfil, Permissao } from "../../../src"
import ExcluirPermissao from "../../../src/usecases/permissao/ExcluirPermissao"
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock"
import { RepositorioPermissaoMock } from "../../mock/RepositorioPermissaoMock"

const permissao1 = { nome: 'vizualizar', descricao: 'vizualização' }
const perfil1 = { nome: 'Admin', descricao: 'Administrador' }

test('Deve excluir uma permissão', async () => {
    const novaPermissao = new Permissao(permissao1)
    const repo = new RepositorioPermissaoMock([novaPermissao])
    const repoPerfil = new RepositorioPerfilMock()
    const casoDeUso = new ExcluirPermissao(repo, repoPerfil)

    await casoDeUso.executar(novaPermissao.getUuid())

    const buscarPermissao = await repo.obterPermissaoPorId(novaPermissao.getUuid())
    expect(buscarPermissao).toBeNull()
})

test('Deve gerar erro ao tentar excluir permissão inexistente', async () => {
    const repo = new RepositorioPermissaoMock()
    const repoPerfil = new RepositorioPerfilMock()
    const casoDeUso = new ExcluirPermissao(repo, repoPerfil)

    expect(async () =>{
        await casoDeUso.executar(Id.novo.uuid)
    }).rejects.toThrow("permissão não existe.")

})
test('Deve gerar um erro ao tentar excluir uma permissão se houver perfil associado', async () => {
    const novaPermissao = new Permissao(permissao1)
    const novoPerfil = new Perfil(perfil1)
    novoPerfil.adicionarPermissao(novaPermissao)

    const repo = new RepositorioPermissaoMock([novaPermissao])
    const repoPerfil = new RepositorioPerfilMock([novoPerfil])
    const casoDeUso = new ExcluirPermissao(repo, repoPerfil)

    expect(async () => {
        await casoDeUso.executar(novaPermissao.getUuid())
    }).rejects.toThrow('não é possível excluir a permissão. Existe perfil associado ela.')
})