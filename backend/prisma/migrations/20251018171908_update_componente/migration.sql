/*
  Warnings:

  - You are about to drop the column `fixo` on the `componente` table. All the data in the column will be lost.
  - You are about to drop the column `ordem` on the `componente` table. All the data in the column will be lost.
  - You are about to drop the column `paginaId` on the `componente` table. All the data in the column will be lost.
  - You are about to alter the column `tipo` on the `componente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `updatedAt` to the `Componente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `componente` DROP FOREIGN KEY `Componente_paginaId_fkey`;

-- DropIndex
DROP INDEX `Componente_paginaId_fkey` ON `componente`;

-- AlterTable
ALTER TABLE `componente` DROP COLUMN `fixo`,
    DROP COLUMN `ordem`,
    DROP COLUMN `paginaId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `tipo` INTEGER NOT NULL;
