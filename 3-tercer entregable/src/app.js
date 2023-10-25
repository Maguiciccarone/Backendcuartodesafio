import express from 'express';
import { ProductManager } from './ProductManager.js';
const productManager = new ProductManager('./products.json');

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));