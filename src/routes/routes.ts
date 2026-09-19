import { Router } from "express";

//=========================Clientes============================================================
import { CreateClientController } from "../controllers/client/createClientController";
import { getClientController } from "../controllers/client/getClientController";

//=============================Produtos===============================================
import { createProductController } from "../controllers/product/createProductController";

//=============================Categorias===========================
import { createCategoryController } from "../controllers/category/createCategoryController";

//====================Menu==================================================================
import { createCardapioController } from "../controllers/menu/createMenuController";
import { createCardapioItemController } from "../controllers/menu/createMenuItemController";
import { getMenuController } from "../controllers/menu/getMeuController";

//============================CARRINHO DE COMPRA===========================================================
import { createCartController } from "../controllers/car/createCarController";
import { createCartItemController } from "../controllers/car/createCartItemController";
import { createCartItemAdditionalController } from "../controllers/car/createCartItemAdicionalController";
import { cartRemoveController } from "../controllers/car/cartRemoveController";
import { getCartController } from "../controllers/car/getCartController";

//=============================Adicionais para produto=============================
import { createAdditionalController } from "../controllers/adicional/createAdditionalController";
import { createProductAdditionalController } from "../controllers/adicional/creatProductAdditionalController";

//=============================BAIRRO=============================
import { createBairroController } from "../controllers/neighborhood/createNeighborhoodController";
import { listBairroController } from "../controllers/neighborhood/listNeiborhood.Controller";
import { getBairroController } from "../controllers/neighborhood/getIdNeighborhoodController";

const router = Router();

const createClientController = new CreateClientController();

// =====================Rotas de Clientes==================================================
router.post("/clients", (req, res) => createClientController.handle(req, res));
router.post("/clientes", (req, res) => createClientController.handle(req, res));
router.get("/getClient", new getClientController().handle);

//========================Rota de Produtos==========================================
router.post("/createProduct", new createProductController().handle);

//==============================Categorias deProdutos===================================
router.post("/createCategory", new createCategoryController().handle);

//======================MENU==========================================================
router.post("/menu", new createCardapioController().handle);
router.post("/menuItem", new createCardapioItemController().handle);
router.get("/getMenu", new getMenuController().handle);

//==================================CARRINHO DE COMPRAS=========================
router.post("/cart", new createCartController().handle);
router.post("/cartItem", new createCartItemController().handle);
router.post(
  "/cart-item-additional",
  new createCartItemAdditionalController().handle,
);
router.post("/cart-item-remove", new cartRemoveController().handle);
router.get("/getCart/:id", new getCartController().handle);

//=========================ADICIONAIS PARA PRODUTOS=============
router.post("/createAdditional", new createAdditionalController().handle);
router.post(
  "/product-additional",
  new createProductAdditionalController().handle,
);

//===================================Bairro=======================================
router.post("/createBairro", new createBairroController().handle);
router.get("/listBairro", new listBairroController().handle);
router.get("/getBairro/:id", new getBairroController().handle);

export { router };
