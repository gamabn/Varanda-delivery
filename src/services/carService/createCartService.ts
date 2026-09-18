import { prisma } from "../../lib/prisma";
import { CarrinhoItemCreateRequest } from "../../type/type";

class createCartItemService {
  async execulte(dados: CarrinhoItemCreateRequest) {
    if (
      !dados ||
      !dados.carrinhoId ||
      !dados.produtoId ||
      dados.quantidade === undefined
    ) {
      throw new Error(
        "Envie os dados obrigatórios (carrinhoId, produtoId, quantidade)",
      );
    }

    if (dados.quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero.");
    }

    // 1. Verifica o carrinho
    const carrinho = await prisma.carrinho.findUnique({
      where: {
        id: dados.carrinhoId,
      },
    });

    if (!carrinho) {
      throw new Error("Carrinho não encontrado.");
    }

    // Só podemos adicionar produtos em carrinho aberto
    if (carrinho.status !== "ABERTO") {
      throw new Error("Este carrinho não está aberto.");
    }

    // 2. Busca o cardápio de hoje
    const agora = new Date();

    const inicioDoDia = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate(),
    );

    const fimDoDia = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate() + 1,
    );

    const cardapio = await prisma.cardapio.findFirst({
      where: {
        data: {
          gte: inicioDoDia,
          lt: fimDoDia,
        },
        ativo: true,
      },
    });

    if (!cardapio) {
      throw new Error("Não existe cardápio disponível para hoje.");
    }

    // 3. Busca o produto dentro do cardápio de hoje
    const cardapioItem = await prisma.cardapioItem.findUnique({
      where: {
        cardapioId_produtoId: {
          cardapioId: cardapio.id,
          produtoId: dados.produtoId,
        },
      },
      include: {
        produto: true,
      },
    });

    if (!cardapioItem) {
      throw new Error("Este produto não está disponível no cardápio de hoje.");
    }

    // 4. Verifica disponibilidade
    if (!cardapioItem.disponivel) {
      throw new Error("Este produto está indisponível no momento.");
    }

    if (!cardapioItem.produto.ativo) {
      throw new Error("Este produto está inativo.");
    }

    if (!cardapioItem.produto.disponivel) {
      throw new Error("Este produto está indisponível no momento.");
    }

    // 5. Cria o item no carrinho
    const carrinhoItem = await prisma.carrinhoItem.create({
      data: {
        carrinhoId: dados.carrinhoId,
        produtoId: dados.produtoId,
        quantidade: dados.quantidade,
        precoUnitario: cardapioItem.preco,
        observacao: dados.observacao,
      },
      include: {
        produto: true,
        adicionais: {
          include: {
            adicional: true,
          },
        },
        remocoes: true,
      },
    });

    return carrinhoItem;
  }
}

export { createCartItemService };
