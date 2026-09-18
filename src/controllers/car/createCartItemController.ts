import { Request, Response } from "express";
import { CarrinhoItemCreateRequest } from "../../type/type";
import { createCartItemService } from "../../services/carService/createCartService";

class createCartItemController {
  async handle(req: Request, res: Response) {
    const dados: CarrinhoItemCreateRequest = req.body;

    try {
      const createCartItem = new createCartItemService();

      const cartItem = await createCartItem.execulte(dados);

      return res.status(201).json(cartItem);
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

export { createCartItemController };
