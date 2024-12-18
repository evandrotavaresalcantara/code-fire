import { Id } from "common"
import { Usuario } from "../../../src"
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock"
import AtualizarSenha from "../../../src/usecases/usuario/AtualizarSenha"
import ProvedorCriptografiaMock from "../../mock/ProvedorCriptografiaMock"

const senha1 = "CodeFire!1"
const senha2 = "CodeFire!2"
const hash1 = '$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm'
const hash2 = '$2b$10$yxPNAEZibEGvZ0czM9tYA.UKYDx5dm/w1iNQFi6c2RXo8Pw6bCDES'

const usuarioComHash = {
    nomeCompleto: "Fire Dev",
    email: "ususariofire1@dev.io",
    celular: "81911112222",
    senha: hash1,
    urlPerfil: "http://imagens.io/fire.png"
}

test("Deve atualizar senha do usuário.", async () => {
    const novoUsuario = new Usuario(usuarioComHash)
    const repoUsuario = new RepositorioUsuarioMock([novoUsuario])
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    await casoDeUso.executar({
        id: novoUsuario.getUuid(),
        senhaAntiga: senha1,
        senhaNova: senha2,
        senhaNovaConfirmacao: senha2,
    },)

    const usuarioSalvo = await repoUsuario.obterUsuarioPorId(novoUsuario.getUuid())
    expect(usuarioSalvo?.getSenha()).toBe(hash2)
})

test("Deve gerar um erro ao tentar atualizar senha, com a nova senha diferente da confirmação.", async () => {
    const novoUsuario = new Usuario(usuarioComHash)
    const repoUsuario = new RepositorioUsuarioMock([novoUsuario])
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    expect(async () => {
        await casoDeUso.executar({
            id: novoUsuario.getUuid(),
            senhaAntiga: senha1,
            senhaNova: senha2,
            senhaNovaConfirmacao: senha1,
        })
    }).rejects.toThrow("senha nova e confirmação da senha nova são diferentes.")
})

test("Deve gerar um erro ao tentar atualizar senha, sem senha cadastrada.", async () => {
    const { senha, ...usuarioSemSenha } = usuarioComHash
    const novoUsuario = new Usuario(usuarioSemSenha)
    const repoUsuario = new RepositorioUsuarioMock([novoUsuario])
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    expect(async () => {
        await casoDeUso.executar({
           id: novoUsuario.getUuid(),
            senhaAntiga: senha1,
            senhaNova: senha2,
            senhaNovaConfirmacao: senha2,
        })
    }).rejects.toThrow("usuário inativo.")
})

test("Deve gerar um erro ao tentar atualizar a senha, sem passar a senha antiga.", async () => {
    const novoUsuario = new Usuario(usuarioComHash)
    const repoUsuario = new RepositorioUsuarioMock([novoUsuario])
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    expect(async () => {
        await casoDeUso.executar({
            id: novoUsuario.getUuid(),
            senhaNova: senha2,
            senhaNovaConfirmacao: senha2,
        })
    }).rejects.toThrow("email ou senha incorreto.")
})

test("Deve gerar um erro ao atualizar senha, passando senha atual errada.", async () => {
    const novoUsuario = new Usuario(usuarioComHash)
    const repoUsuario = new RepositorioUsuarioMock([novoUsuario])
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    expect(async () => {
        await casoDeUso.executar({
            id: novoUsuario.getUuid(),
            senhaAntiga: senha2,
            senhaNova: senha2,
            senhaNovaConfirmacao: senha2,
        })
    }).rejects.toThrow("email ou senha incorreto.")
})

test("Deve gerar um erro ao tentar atualizar senha, de usuári inexistente.", async () => {
    const repoUsuario = new RepositorioUsuarioMock()
    const provedorCriptografia = new ProvedorCriptografiaMock()
    const casoDeUso = new AtualizarSenha(repoUsuario, provedorCriptografia)

    expect(async () => {
        await casoDeUso.executar({
            id: Id.novo.uuid,
            senhaAntiga: senha2,
            senhaNova: senha2,
            senhaNovaConfirmacao: senha2,
        })
    }).rejects.toThrow("usuário não existe.")
})