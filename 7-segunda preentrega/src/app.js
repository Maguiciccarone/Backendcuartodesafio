
import express from 'express';
// import productRouter from './routes/product.router.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { __dirname } from './utils.js';
import MongoStore from 'connect-mongo';
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import './db/connection.js';
import { MONGOATLAS } from "./db/connection.js";
import handlebars from 'express-handlebars';
// import cartRouter from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: MONGOATLAS,
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(session(mongoStoreOptions));


// app.use('/products', productRouter);
// app.use('/carts', cartRouter);
app.use('/users', userRouter);
app.use('/views', viewsRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));