-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Site` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dominio` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `siteId` INTEGER NULL,
    `layoutId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Componente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` ENUM('TITULO', 'TEXTO', 'IMAGEM', 'TITULO_TEXTO', 'TITULO_IMAGEM', 'TEXTO_IMAGEM', 'TITULO_TEXTO_IMAGEM', 'FOOTER', 'NAVBAR', 'CONTATO') NOT NULL,
    `configuracoes` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaginaComponente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paginaId` INTEGER NOT NULL,
    `componenteId` INTEGER NOT NULL,
    `ordem` INTEGER NOT NULL,

    UNIQUE INDEX `PaginaComponente_paginaId_ordem_key`(`paginaId`, `ordem`),
    UNIQUE INDEX `PaginaComponente_paginaId_componenteId_key`(`paginaId`, `componenteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LayoutComponentes` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LayoutComponentes_AB_unique`(`A`, `B`),
    INDEX `_LayoutComponentes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Site` ADD CONSTRAINT `Site_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagina` ADD CONSTRAINT `Pagina_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagina` ADD CONSTRAINT `Pagina_layoutId_fkey` FOREIGN KEY (`layoutId`) REFERENCES `Layout`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaginaComponente` ADD CONSTRAINT `PaginaComponente_paginaId_fkey` FOREIGN KEY (`paginaId`) REFERENCES `Pagina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaginaComponente` ADD CONSTRAINT `PaginaComponente_componenteId_fkey` FOREIGN KEY (`componenteId`) REFERENCES `Componente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LayoutComponentes` ADD CONSTRAINT `_LayoutComponentes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Componente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LayoutComponentes` ADD CONSTRAINT `_LayoutComponentes_B_fkey` FOREIGN KEY (`B`) REFERENCES `Layout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
