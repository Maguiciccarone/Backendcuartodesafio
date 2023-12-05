import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


export const cartSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            default: []
        }
    ]
});

cartSchema.plugin(mongoosePaginate);
cartSchema.pre('find', function () {
    this.populate('products')
})

export const CartModel = model('carts', cartSchema);