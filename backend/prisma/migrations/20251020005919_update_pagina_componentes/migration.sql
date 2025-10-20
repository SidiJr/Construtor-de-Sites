/*
  Warnings:

  - You are about to drop the column `slug` on the `pagina` table. All the data in the column will be lost.
  - Added the required column `endereco` to the `Pagina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagina` DROP COLUMN `slug`,
    ADD COLUMN `endereco` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_PaginaComponentes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PaginaComponentes_AB_unique`(`A`, `B`),
    INDEX `_PaginaComponentes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PaginaComponentes` ADD CONSTRAINT `_PaginaComponentes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Componente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PaginaComponentes` ADD CONSTRAINT `_PaginaComponentes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pagina`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
