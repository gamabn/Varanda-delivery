import { prisma } from "../../lib/prisma";

class getMenuService {
  async execulte() {
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
      include: {
        itens: {
          where: {
            disponivel: true,
            produto: {
              ativo: true,
              disponivel: true,
            },
          },
          include: {
            produto: {
              include: {
                categoria: true,
              },
            },
          },
          orderBy: {
            ordem: "asc",
          },
        },
      },
    });

    if (!cardapio) {
      throw new Error("Não existe cardápio disponível para hoje.");
    }

    const categoriasMap = new Map<
      string,
      {
        id: string;
        nome: string;
        ordem: number;
        produtos: any[];
      }
    >();

    for (const item of cardapio.itens) {
      const categoria = item.produto.categoria;

      if (!categoriasMap.has(categoria.id)) {
        categoriasMap.set(categoria.id, {
          id: categoria.id,
          nome: categoria.nome,
          ordem: categoria.ordem,
          produtos: [],
        });
      }

      categoriasMap.get(categoria.id)?.produtos.push({
        id: item.produto.id,
        nome: item.produto.nome,
        descricao: item.produto.descricao,
        preco: item.preco,
        ordem: item.ordem,
      });
    }

    const categorias = Array.from(categoriasMap.values())
      .sort((a, b) => a.ordem - b.ordem)
      .map((categoria) => ({
        ...categoria,
        produtos: categoria.produtos.sort((a, b) => a.ordem - b.ordem),
      }));

    return {
      id: cardapio.id,
      data: cardapio.data,
      categorias,
    };
  }
}

export { getMenuService };
