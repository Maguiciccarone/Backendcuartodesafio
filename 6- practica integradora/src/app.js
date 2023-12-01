// import './daos/mongodb/connection.js';
import express from 'express';

import productsRouter from './routes/product.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';

const persistence = 'MONGO';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/products', productsRouter);

app.use(errorHandler);

if (persistence === 'MONGO') await initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));