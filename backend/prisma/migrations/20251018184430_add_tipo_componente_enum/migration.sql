/*
  Warnings:

  - You are about to alter the column `tipo` on the `componente` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `componente` MODIFY `tipo` ENUM('TITULO', 'TEXTO', 'TITULO_TEXTO') NOT NULL;
