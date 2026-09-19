import { prisma } from "../../lib/prisma";

class listNeighborhoodService {
  async execute() {
    const bairros = await prisma.bairro.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return bairros;
  }
}

export { listNeighborhoodService };
