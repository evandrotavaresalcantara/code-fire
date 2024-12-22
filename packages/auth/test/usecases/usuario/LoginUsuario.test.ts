import { TokenFlags } from "typescript"
import { Usuario } from "../../../src"
import LoginUsuario from "../../../src/usecases/usuario/LoginUsuario"
import ProvedorCriptografiaMock from "../../mock/ProvedorCriptografiaMock"
import RepositorioUsuarioMock from "../../mock/RepositorioUsuarioMock"
import TokenJwt from "../../../src/model/TokenJwt"

const senhaErrada = "CodeFire"
const senha1 = "CodeFire!1"
const senha2 = "CodeFire!2"
const hash1 = '$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm'
const hash2 = '$2b$10$yxPNAEZibEGvZ0czM9tYA.UKYDx5dm/w1iNQFi6c2RXo8Pw6bCDES'

test("Deve fazer o login e retornar um token", async () => {
    const usuario = {
        nomeCompleto: "Fire Dev",
        email: "ususariofire1@dev.io",
        celular: "81986598745",
        senha: hash1
    }
    const novoUsuario = new Usuario(usuario)
    const casoDeUso = new LoginUsuario(
        new RepositorioUsuarioMock([novoUsuario]),
        new ProvedorCriptografiaMock(),
    )
    const token = await casoDeUso.executar({ email: usuario.email, senha: senha1 })
    expect(token).not.toBe("")
    expect(typeof token).toBe("string")
})

test("Deve gerar um erro ao tentar fazer o login com email errado.", async () => {
    const casoDeUso = new LoginUsuario(
        new RepositorioUsuarioMock(),
        new ProvedorCriptografiaMock(),
    )
    const email = "naoexiste@email.com.br"
    const senha = "123456789"

    expect(async () => {
        await casoDeUso.executar({ email, senha })
    }).rejects.toThrow("email ou senha inválida.")
})

test("Deve gerar um erro ao tentar fazer o login com a senha errada", async () => {
    const usuario = {
        nomeCompleto: "Fire Dev",
        email: "ususariofire1@dev.io",
        celular: "81986598745",
        senha: hash1
    }
    const novoUsuario = new Usuario(usuario)
    const casoDeUso = new LoginUsuario(
        new RepositorioUsuarioMock([novoUsuario]),
        new ProvedorCriptografiaMock(),
    )

    expect(async () => {
        await casoDeUso.executar({ email: usuario.email, senha:senhaErrada })
    }).rejects.toThrow("email ou senha inválida.")
})

test("Deve gerar um erro ao tentar fazer o login com usuário desabilitado", async () => {
    const usuario = {
        nomeCompleto: "Fire Dev",
        email: "ususariofire1@dev.io",
        celular: "81986598745",
        senha: hash1,
        ativo: false
    }
    const novoUsuario = new Usuario(usuario)
    const casoDeUso = new LoginUsuario(
        new RepositorioUsuarioMock([novoUsuario]),
        new ProvedorCriptografiaMock(),
    )
    expect(async () => {
        await casoDeUso.executar({ email: usuario.email, senha:senhaErrada })
    }).rejects.toThrow("Usuário desabilitado.")
})

test("Deve gerar um erro ao tentar fazer o login de um usuário sem senha", async () => {
    const usuario = {
        nomeCompleto: "Fire Dev",
        email: "ususariofire1@dev.io",
        celular: "81986598745",
    }
    const novoUsuario = new Usuario(usuario)
    const casoDeUso = new LoginUsuario(
        new RepositorioUsuarioMock([novoUsuario]),
        new ProvedorCriptografiaMock(),
    )

    expect(async () => {
        await casoDeUso.executar({ email: usuario.email, senha:senhaErrada })
    }).rejects.toThrow("email ou senha inválida.")
})