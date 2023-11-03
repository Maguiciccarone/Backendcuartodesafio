import { Router } from "express";
const router = Router();

import { CartManager } from "../managers/cart.manager.js";
const cartManager = new CartManager('./src/data/cart.json');


router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartManager.createCart();
        res.status(200).json(cartCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if (!cart) res.status(404).json({ message: "Cart not found" });
        else res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/:idCart/product/:idProduct', async (req, res) => {
    const { idProduct, idCart } = req.params;
    try {

        const product = await cartManager.getProductById(Number(idProduct));
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {

            const updatedCart = await cartManager.saveProductToCart(Number(idCart), product);
            res.status(200).json(updatedCart);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
