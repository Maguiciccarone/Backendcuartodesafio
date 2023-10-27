import express from 'express';
import { ProductManager } from './ProductManager.js';
const productManager = new ProductManager('./products.json');

const app = express();
const PORT = 8080;

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, parseInt(limit)));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.get('/products/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if (!product) res.status(404).json({ message: 'Product not found' });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));