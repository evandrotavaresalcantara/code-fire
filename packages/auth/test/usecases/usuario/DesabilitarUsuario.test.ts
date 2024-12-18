import { Id } from "common"
import { Usuario } from "../../../src"
import DesabilitarUsuario from "../../../src/usecases/usuario/DesabilitarUsuario"
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock"

const hash1 = '$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm'
const usuario = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    celular: "81911112222",
    senha: hash1,
    urlPerfil: "http://imagens.io/fire.png"
}

test('Deve desabilitar um usuário', async () => {
    const novoUsuario = new Usuario(usuario)
    const repo = new RepositorioUsuarioMock([novoUsuario])
    const casoDeUso = new DesabilitarUsuario(repo)

    await casoDeUso.executar(novoUsuario.getUuid())
    const usuarioSalvo = await repo.obterUsuarioPorId(novoUsuario.getUuid())
    expect(usuarioSalvo?.habilitado).toBeFalsy()
})

test('Deve gerar um erro ao tentar desabilitar um usuário que não exsiste', async () => {
    const repo = new RepositorioUsuarioMock()
    const casoDeUso = new DesabilitarUsuario(repo)

    expect(async () =>{
        await casoDeUso.executar(Id.novo.uuid)
    }).rejects.toThrow('usuário não existe.')
})