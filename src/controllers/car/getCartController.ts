import { Request, Response } from "express";
import { getCartService } from "../../services/carService/getCartService";

class getCartController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (Array.isArray(id)) {
        return res.status(400).json({
          error: "ID inválido.",
        });
      }

      const getCart = new getCartService();

      const cart = await getCart.execulte(id);

      return res.status(200).json(cart);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor.",
      });
    }
  }
}

export { getCartController };
