import { Perfil, Permissao } from "../../../src";
import { ObterPerfis } from "../../../src/usecases/perfil/ObterPerfis";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";

const perfil1 = { nome: "Admin", descricao: "Administração" };
const perfil2 = { nome: "Usuario", descricao: "Operações" };
const perfil3 = { nome: "Gerencia", descricao: "Cordenação" };

const permissao1 = { nome: "vizualizar", descricao: "vizualização" };
const permissao2 = { nome: "adicionar", descricao: "inclusão" };
const permissao3 = { nome: "editar", descricao: "edição" };
const permissao4 = { nome: "excluir", descricao: "exclusão" };

test("Deve obter os perfis com suas respectivas permissões", async () => {
  const novaPermissao1 = new Permissao(permissao1);
  const novaPermissao2 = new Permissao(permissao2);
  const novaPermissao3 = new Permissao(permissao3);
  const novaPermissao4 = new Permissao(permissao4);
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const novoPerfil3 = new Perfil(perfil3);

  novoPerfil1.adicionarPermissao(novaPermissao1);
  novoPerfil1.adicionarPermissao(novaPermissao2);
  novoPerfil1.adicionarPermissao(novaPermissao3);
  novoPerfil1.adicionarPermissao(novaPermissao4);

  novoPerfil2.adicionarPermissao(novaPermissao1);
  novoPerfil2.adicionarPermissao(novaPermissao2);
  novoPerfil2.adicionarPermissao(novaPermissao3);

  novoPerfil3.adicionarPermissao(novaPermissao1);
  novoPerfil3.adicionarPermissao(novaPermissao2);

  const repo = new RepositorioPerfilMock([
    novoPerfil1,
    novoPerfil2,
    novoPerfil3,
  ]);

  const casoDeUso = new ObterPerfis(repo);
  const perfis = await casoDeUso.executar();
  expect(perfis).toHaveLength(3);
});
