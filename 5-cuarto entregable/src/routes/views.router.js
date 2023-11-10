const router = Router();
import { Router } from "express";
import { ProductManager } from "../managers/product.manager.js";

const productManager = new ProductManager("./src/data/products.json");

router.get(("/"), async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", { products });
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProduct", { products });
});


export default router;