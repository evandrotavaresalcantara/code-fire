/*
  Warnings:

  - Added the required column `dataCriacao` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataCriacao` to the `Permissao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "dataCriacao" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Permissao" ADD COLUMN     "dataCriacao" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "dataExpiracaoToken" DROP NOT NULL;
