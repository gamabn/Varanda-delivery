/*
  Warnings:

  - Added the required column `updatedAt` to the `PedidoItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PedidoItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Cardapio" (
    "id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cardapio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardapioItem" (
    "id" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "cardapioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardapioItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrinhoItemAdicional" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "precoUnitario" DECIMAL(10,2) NOT NULL,
    "carrinhoItemId" TEXT NOT NULL,
    "adicionalId" TEXT NOT NULL,

    CONSTRAINT "CarrinhoItemAdicional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItemAdicional" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "nome" TEXT NOT NULL,
    "precoUnitario" DECIMAL(10,2) NOT NULL,
    "pedidoItemId" TEXT NOT NULL,
    "adicionalId" TEXT,

    CONSTRAINT "PedidoItemAdicional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarrinhoItemRemocao" (
    "id" TEXT NOT NULL,
    "ingrediente" TEXT NOT NULL,
    "carrinhoItemId" TEXT NOT NULL,

    CONSTRAINT "CarrinhoItemRemocao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItemRemocao" (
    "id" TEXT NOT NULL,
    "ingrediente" TEXT NOT NULL,
    "pedidoItemId" TEXT NOT NULL,

    CONSTRAINT "PedidoItemRemocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cardapio_data_key" ON "Cardapio"("data");

-- CreateIndex
CREATE UNIQUE INDEX "CardapioItem_cardapioId_produtoId_key" ON "CardapioItem"("cardapioId", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "CarrinhoItemAdicional_carrinhoItemId_adicionalId_key" ON "CarrinhoItemAdicional"("carrinhoItemId", "adicionalId");

-- CreateIndex
CREATE INDEX "PedidoItemAdicional_pedidoItemId_idx" ON "PedidoItemAdicional"("pedidoItemId");

-- CreateIndex
CREATE INDEX "CarrinhoItemRemocao_carrinhoItemId_idx" ON "CarrinhoItemRemocao"("carrinhoItemId");

-- CreateIndex
CREATE INDEX "PedidoItemRemocao_pedidoItemId_idx" ON "PedidoItemRemocao"("pedidoItemId");

-- AddForeignKey
ALTER TABLE "CardapioItem" ADD CONSTRAINT "CardapioItem_cardapioId_fkey" FOREIGN KEY ("cardapioId") REFERENCES "Cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardapioItem" ADD CONSTRAINT "CardapioItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItemAdicional" ADD CONSTRAINT "CarrinhoItemAdicional_carrinhoItemId_fkey" FOREIGN KEY ("carrinhoItemId") REFERENCES "CarrinhoItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItemAdicional" ADD CONSTRAINT "CarrinhoItemAdicional_adicionalId_fkey" FOREIGN KEY ("adicionalId") REFERENCES "Adicional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItemAdicional" ADD CONSTRAINT "PedidoItemAdicional_pedidoItemId_fkey" FOREIGN KEY ("pedidoItemId") REFERENCES "PedidoItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItemAdicional" ADD CONSTRAINT "PedidoItemAdicional_adicionalId_fkey" FOREIGN KEY ("adicionalId") REFERENCES "Adicional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItemRemocao" ADD CONSTRAINT "CarrinhoItemRemocao_carrinhoItemId_fkey" FOREIGN KEY ("carrinhoItemId") REFERENCES "CarrinhoItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItemRemocao" ADD CONSTRAINT "PedidoItemRemocao_pedidoItemId_fkey" FOREIGN KEY ("pedidoItemId") REFERENCES "PedidoItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
