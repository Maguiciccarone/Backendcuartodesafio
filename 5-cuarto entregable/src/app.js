import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import { __dirname } from './utils.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.render('home')
})
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`usuario conectado ${socket.id}`);
    socket.on('disconnect', () => console.log('usuario desconectado'))
    socket.emit('saludoDesdeBack', 'Bienvenido a Onashaga')
})