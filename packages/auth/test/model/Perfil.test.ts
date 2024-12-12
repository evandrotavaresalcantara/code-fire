import Perfil from "../../src/model/Perfil"
import Permissao from "../../src/model/Permissao"

test('Deve criar um perfil com permissões vazia', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador'}
    const novoPerfil = new Perfil(perfil)
    expect(novoPerfil.qtdPermissoes).toBe(0)
})

test('Deve adicionar uma permissão ao perfil', () => {
    const permissao = { nome: "criar", descricao: 'criacao', ativo: true }
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const novaPermissao = new Permissao(permissao)
    const novoPerfil = new Perfil(perfil)
    novoPerfil.adiconarPermissao(novaPermissao)
    expect(novoPerfil.qtdPermissoes).toBe(1)
})

test('Deve obter as permissões de um perfil', () => {
    const permissao = { nome: "criar", descricao: 'criacao', ativo: true };
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true };
    const novaPermissao = new Permissao(permissao);
    const novoPerfil = new Perfil(perfil);
    novoPerfil.adiconarPermissao(novaPermissao);
    expect(novoPerfil.qtdPermissoes).toBe(1);
    expect(novoPerfil.getObterPermissoes()).toContain(novaPermissao)
})

test('Deve adicionar duas permissões diferentes ao perfil', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const permissao1 = { nome: "criar", descricao: 'criação', ativo: true }
    const permissao2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novaPermissao1 = new Permissao(permissao1)
    const novaPermissao2 = new Permissao(permissao2)
    const novoPerfil = new Perfil(perfil)
    novoPerfil.adiconarPermissao(novaPermissao1)
    novoPerfil.adiconarPermissao(novaPermissao2)
    expect(novoPerfil.qtdPermissoes).toBe(2)
})

test('Deve tentar cria uma segunda permissão já cadastrada', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const permissao = { nome: "criar", descricao: 'criação', ativo: true }
    const novaPermissao = new Permissao(permissao)
    const clonePermissao = novaPermissao.clonar({})
    const novoPerfil = new Perfil(perfil)
    novoPerfil.adiconarPermissao(novaPermissao)
    novoPerfil.adiconarPermissao(clonePermissao)
    expect(novoPerfil.qtdPermissoes).toBe(1)
})

test('Deve remove uma permissão que existe no perfil', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const permissao1 = { nome: "criar", descricao: 'criação', ativo: true }
    const permissao2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novaPermissao1 = new Permissao(permissao1)
    const novaPermissao2 = new Permissao(permissao2)
    const novoPerfil = new Perfil(perfil)
    novoPerfil.adiconarPermissao(novaPermissao1)
    novoPerfil.adiconarPermissao(novaPermissao2)
    novoPerfil.removerPermissao(novaPermissao1)

    expect(novoPerfil.qtdPermissoes).toBe(1)
    expect(novoPerfil.getObterPermissoes()).toContain(novaPermissao2)
})

test('Deve tentar remove uma permissão que não existe no perfil', () => {
    const perfil = { nome: "Admin", descricao: 'Administrador', ativo: true }
    const permissao1 = { nome: "criar", descricao: 'criação', ativo: true }
    const permissao2 = { nome: "editar", descricao: 'edição', ativo: true }
    const novaPermissao1 = new Permissao(permissao1)
    const novaPermissao2 = new Permissao(permissao2)
    const novoPerfil = new Perfil(perfil)
    novoPerfil.adiconarPermissao(novaPermissao1)
    novoPerfil.removerPermissao(novaPermissao2)

    expect(novoPerfil.qtdPermissoes).toBe(1)
    expect(novoPerfil.getObterPermissoes()).toContain(novaPermissao1)
})
