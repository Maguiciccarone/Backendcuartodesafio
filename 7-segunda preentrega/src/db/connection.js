import mongoose from 'mongoose';

// const MONGOATLAS = "mongodb+srv://admin:05SoLCqlJ92foihJ@ciccarone.0jpo6y7.mongodb.net/?retryWrites=true&w=majority"

const MONGOCOMPASS = "mongodb://127.0.0.1:27017/ecommerce";

export const initMongoDB = async () => {
    try {
        await mongoose.connect(MONGOCOMPASS);
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
};