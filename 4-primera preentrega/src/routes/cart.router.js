import { Router } from "express";
const router = Router();

import { CartManager } from "../managers/cart.manager.js";
const cartManager = new CartManager('./src/data/cart.json');


router.post('/', async (req, res) => {
    // crear carrito
    try {
        const cartCreated = await cartManager.createCart(req.body);
        res.status(200).json(cartCreated);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/:cid ', async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if (!cart) res.status(404).json({ message: "cart not found" });
        else res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post('/:idCart/product/:idProduct ', async (req, res) => {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    // llamar metodo que busca cart por id
    // llamar metodo que busca product por id
    await cartManager.saveProductToCart(idProduct, idCart);
});

export default router;