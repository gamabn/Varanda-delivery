import { prisma } from "../../lib/prisma";
import { CardapioCreateRequest } from "../../type/type";

class createCardapioService {
  async execulte(dados: CardapioCreateRequest) {
    if (!dados || !dados.data) {
      throw new Error("Informe a data do cardápio.");
    }

    const data = new Date(`${dados.data}T00:00:00`);

    if (isNaN(data.getTime())) {
      throw new Error("Data do cardápio inválida.");
    }

    const cardapioExistente = await prisma.cardapio.findUnique({
      where: {
        data,
      },
    });

    if (cardapioExistente) {
      throw new Error("Já existe um cardápio para esta data.");
    }

    const cardapio = await prisma.cardapio.create({
      data: {
        data,
      },
    });

    return cardapio;
  }
}

export { createCardapioService };
