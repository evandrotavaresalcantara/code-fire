import Perfil from "../../src/model/Perfil"
import Usuario from "../../src/model/Usuario"

const usuario = {
    nomeCompleto: "Maria Jullieta",
    email: "maria@dev.io",
    senha: "$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq",
    celular: "81985698585",
    urlPerfil: "https://meuperfil.online/maria.png",
    ativo: true,
    dataExpiracaoToken: new Date,
    tokenRecuperacaoSenha: 'meuToken',
    autenticaçãoDoisFatores: true,
}

const usuarioMinimo = {
    nomeCompleto: "Zé Dev",
    email: "ze@dev.io",
}

test('Deve criar um usuário com perfil vazio', () => {
    const novoUsuario = new Usuario(usuario)
    expect(novoUsuario.qtdPerfils).toBe(0)
})

test('Deve criar um usuário somente com nome e email', () => {
    const novoUsuario = new Usuario(usuarioMinimo)
    expect(novoUsuario.qtdPerfils).toBe(0)
    expect(novoUsuario.getUrlPerfil()).toBeFalsy()
    expect(novoUsuario.getCelular()).toBeFalsy()
})

test('Deve exibir um usuário sem  o hash da senha', () => {
    const novoUsuario = new Usuario(usuario)
    const novoUsuarioSemSenha = novoUsuario.semSenha()
    expect(novoUsuarioSemSenha.getSenha()).toBe(null)
})

test('Deve adicionar um perfil ao usuário', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const novoPerfil = new Perfil(perfil)
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil)
    expect(novoUsuario.qtdPerfils).toBe(1)
})

test('Deve obter os perfis de um usuario', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const novoPerfil = new Perfil(perfil)
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil)
    expect(novoUsuario.qtdPerfils).toBe(1);
    expect(novoUsuario.obterPerfis).toContain(novoPerfil)
})

test('Deve adicionar dois perfis diferentes ao usuário', () => {
    const perfil1 = { nome: "criar", descricao: 'criação', ativo: true }
    const perfil2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novoPerfil1 = new Perfil(perfil1)
    const novoPerfil2 = new Perfil(perfil2)
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil1)
    novoUsuario.adiconarPerfil(novoPerfil2)
    expect(novoUsuario.qtdPerfils).toBe(2)
})

test('Deve tentar cria um perfil já cadastrado', () => {
    const perfil1 = { nome: "criar", descricao: 'criação', ativo: true }
    const novoPerfil1 = new Perfil(perfil1)
    const clone = novoPerfil1.clonar({})
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil1)
    novoUsuario.adiconarPerfil(clone)
    expect(novoUsuario.qtdPerfils).toBe(1)
})

test('Deve remover um perfil existente no usuario', () => {
    const perfil1 = { nome: "criar", descricao: 'criação', ativo: true }
    const perfil2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novoPerfil1 = new Perfil(perfil1)
    const novoPerfil2 = new Perfil(perfil2)
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil1)
    novoUsuario.adiconarPerfil(novoPerfil2)
    novoUsuario.removerPerfil(novoPerfil1)
    expect(novoUsuario.qtdPerfils).toBe(1)
    expect(novoUsuario.obterPerfis).toContain(novoPerfil2)
})

test('Deve tentar remove uma permissão que não existe no usuario', () => {
    const perfil1 = { nome: "criar", descricao: 'criação', ativo: true }
    const perfil2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novoPerfil1 = new Perfil(perfil1)
    const novoPerfil2 = new Perfil(perfil2)
    const novoUsuario = new Usuario(usuario)
    novoUsuario.adiconarPerfil(novoPerfil1)
    novoUsuario.removerPerfil(novoPerfil2)
    expect(novoUsuario.qtdPerfils).toBe(1)
    expect(novoUsuario.obterPerfis).toContain(novoPerfil1)
})