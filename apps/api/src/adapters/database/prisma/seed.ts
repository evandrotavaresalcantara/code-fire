import { Id } from "@packages/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const hash1 = "$2b$10$TUI.yyDk3K5N38xy3grJ0eNFUf8Kk827oUfREU.t7sIXpB8VRBfUm";
// const hash2 = "$2b$10$yxPNAEZibEGvZ0czM9tYA.UKYDx5dm/w1iNQFi6c2RXo8Pw6bCDES";

const permissao1 = {
  id: Id.novo.uuid,
  nome: "vizualizar",
  descricao: "vizualização",
  data_criacao: new Date(),
  ativo: true,
};
// const permissao2 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "adicionar",
//   descricao: "inclusão",
// };
// const permissao3 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "editar",
//   descricao: "edição",
// };
// const permissao4 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "excluir",
//   descricao: "exclusão",
// };

// const perfil1 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "diretores",
//   descricao: "Direção",
// };
// const perfil2 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "usuarios",
//   descricao: "Operações",
// };
// const perfil3 = {
//   id: Id.novo.uuid,
//   dataCriacao: new Date(),
//   ativo: true,
//   nome: "gerentes",
//   descricao: "Gerencia",
// };

// const usuario1 = {
//   id: Id.novo.uuid,
//   email: "emaila@dev.io",
//   nomeCompleto: "Nome A",
//   dataCriacao: new Date(),
//   ativo: true,
//   dataExpiracaoToken: null,
//   autenticaçãoDoisFatores: false,
//   senha: hash1,
//   celular: "81911112222",
//   urlPerfil: "https://meuperfil/nomea.png",
//   tokenRecuperacaoSenha: null,
// };
// const usuario2 = {
//   id: Id.novo.uuid,
//   email: "emailb@dev.io",
//   nomeCompleto: "Nome B",
//   dataCriacao: new Date(),
//   ativo: true,
//   dataExpiracaoToken: null,
//   autenticaçãoDoisFatores: false,
//   senha: hash2,
//   celular: "81911112222",
//   urlPerfil: "https://meuperfil/nomeb.png",
//   tokenRecuperacaoSenha: null,
// };

// const pesmissoes = [permissao1, permissao2, permissao3, permissao4];
// const perfis = [perfil1, perfil2, perfil3];
// const usuarios = [usuario1, usuario2];
async function main() {
  await prisma.permissao.create({
    data: permissao1,
  });
  // await prisma.permissao.deleteMany();
  // await prisma.perfil.deleteMany();
  // await prisma.usuario.deleteMany();

  // await prisma.permissao.createMany({
  //   data: pesmissoes,
  // });
  // await prisma.perfil.createMany({
  //   data: perfis,
  // });
  // await prisma.usuario.createMany({
  //   data: usuarios,
  // });
  console.log("Usuários criados com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
