-- CreateTable
CREATE TABLE "Permissao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "dataExpiracaoToken" TIMESTAMP(3) NOT NULL,
    "autenticaçãoDoisFatores" BOOLEAN NOT NULL,
    "senha" TEXT,
    "celular" TEXT,
    "urlPerfil" TEXT,
    "tokenRecuperacaoSenha" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerfilToPermissao" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PerfilToPermissao_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PerfilToUsuario" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PerfilToUsuario_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PerfilToPermissao_B_index" ON "_PerfilToPermissao"("B");

-- CreateIndex
CREATE INDEX "_PerfilToUsuario_B_index" ON "_PerfilToUsuario"("B");

-- AddForeignKey
ALTER TABLE "_PerfilToPermissao" ADD CONSTRAINT "_PerfilToPermissao_A_fkey" FOREIGN KEY ("A") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfilToPermissao" ADD CONSTRAINT "_PerfilToPermissao_B_fkey" FOREIGN KEY ("B") REFERENCES "Permissao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfilToUsuario" ADD CONSTRAINT "_PerfilToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerfilToUsuario" ADD CONSTRAINT "_PerfilToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
