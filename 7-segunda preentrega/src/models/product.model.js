import { Schema, model } from "mongoose";

import mongoosePaginate from 'mongoose-paginate-v2';

export const productCollection = 'products';
export const productSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true }
});

productSchema.plugin(mongoosePaginate);
export const ProductModel = model(productCollection, productSchema);