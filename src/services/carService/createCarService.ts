import { prisma } from "../../lib/prisma";
import { CarrinhoCreateRequest } from "../../type/type";

class createCartService {
  async execulte(dados: CarrinhoCreateRequest) {
    if (!dados || !dados.clienteId) {
      throw new Error("Informe o clienteId.");
    }

    // Verifica se o cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: dados.clienteId,
      },
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    // Procura um carrinho aberto para esse cliente
    const carrinhoExistente = await prisma.carrinho.findFirst({
      where: {
        clienteId: dados.clienteId,
        status: "ABERTO",
      },
      include: {
        itens: {
          include: {
            produto: true,
            adicionais: {
              include: {
                adicional: true,
              },
            },
            remocoes: true,
          },
        },
      },
    });

    // Se já existe, retorna o carrinho
    if (carrinhoExistente) {
      return carrinhoExistente;
    }

    // Caso não exista, cria um novo
    const carrinho = await prisma.carrinho.create({
      data: {
        clienteId: dados.clienteId,
        status: "ABERTO",
      },
      include: {
        itens: {
          include: {
            produto: true,
            adicionais: {
              include: {
                adicional: true,
              },
            },
            remocoes: true,
          },
        },
      },
    });

    return carrinho;
  }
}

export { createCartService };
