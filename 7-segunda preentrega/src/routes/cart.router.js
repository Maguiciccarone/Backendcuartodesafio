import { Router } from "express";
const router = Router();

import { CartManager } from "../managers/cart.manager.js";
import { ProductManager } from "../managers/product.manager.js";
const cartManager = new CartManager("./src/data/cart.json");
const productManager = new ProductManager("./src/data/products.json");

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

router.post('/:idCart/product/:idProd', async (req, res) => {
    try {
        const { idCart, idProd } = req.params;
        const cart = await cartManager.getCartById(Number(idCart));
        const product = await productManager.getProductById(Number(idProd));
        if (cart && product) {
            const updatedCart = await cartManager.saveProductToCart(Number(idCart), Number(idProd));
            const addedProduct = updatedCart.products.find(p => p.product === Number(idProd));
            res.status(201).json({ message: 'Product added to cart successfully', addedProduct, cart: updatedCart });
        } else {
            res.status(404).json({ error: 'Cart or Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
