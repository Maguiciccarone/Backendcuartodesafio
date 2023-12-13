import mongoose from 'mongoose';

export const MONGOATLAS = "mongodb+srv://admin:05SoLCqlJ92foihJ@ciccarone.0jpo6y7.mongodb.net/?retryWrites=true&w=majority"
// export const MONGOCOMPASS = "mongodb://127.0.0.1:27017/coder47345";

try {
    await mongoose.connect(MONGOATLAS);
    console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
    console.log(`ERROR => ${error}`);
}