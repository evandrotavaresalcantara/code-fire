import { Perfil } from "../../../src";
import { ObterPerfis } from "../../../src/usecases/perfil/ObterPerfis";
import RepositorioPerfilMock from "../../mock/RepositorioPerfilMock";

const perfil1 = { nome: "Admin", descricao: "Administração" };
const perfil2 = { nome: "Usuario", descricao: "Operações" };
const perfil3 = { nome: "Gerencia", descricao: "Cordenação" };

test("Deve obter lista de perfis", async () => {
  const novoPerfil1 = new Perfil(perfil1);
  const novoPerfil2 = new Perfil(perfil2);
  const novoPerfil3 = new Perfil(perfil3);

  const repo = new RepositorioPerfilMock([
    novoPerfil1,
    novoPerfil2,
    novoPerfil3,
  ]);

  const casoDeUso = new ObterPerfis(repo);
  const perfis = await casoDeUso.executar();
  expect(perfis).toHaveLength(3);
});
