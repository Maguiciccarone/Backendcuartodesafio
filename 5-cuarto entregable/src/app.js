import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import { __dirname } from './utils.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import { ProductManager } from './managers/product.manager.js';
import fs from 'fs';
import path from 'path';

const productManager = new ProductManager("./src/data/products.json");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', viewsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = 8089;
const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log("Nuevo Cliente conectado");
    const products = await productManager.getProducts();
    console.log(products)
    socket.emit("products", products);

    socket.on("addProduct", (newProduct) => {
        const filePath = path.join(__dirname, 'data', 'products.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error al leer el archivo 'products.json':", err);
                return;
            }

            const products = JSON.parse(data);
            products.push(newProduct);
            const updatedData = JSON.stringify(products);

            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error("Error al escribir en el archivo 'products.json'");
                    return;
                }
                console.log("Nuevo producto agregado exitosamente");
            });
            socketServer.emit("productAdded", newProduct);
        });
    });
});


export default socketServer;