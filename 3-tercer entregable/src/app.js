import express from 'express';
import { ProductManager } from './ProductManager.js';
const productManager = new ProductManager('.src/products.js');

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const products = await productManager.getProducts();
        if (limit > 0) {
            const limitProd = products.slice(0, limit);
            res.status(200).send(limitProd);
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);

        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));