import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

    async getAll(page = 1, limit = 10, sortOrder = 'desc', query = null) {
        try {
            let queryObject = query ? JSON.parse(query) : {};

            let filter = {};
            for (const [key, value] of Object.entries(queryObject)) {
                if (key === 'category') {
                    filter.category = value;
                } else if (key === 'disponibility') {
                    filter.stock = value ? { $gt: 0 } : { $lt: 1 };
                }
            }

            let myAggregate = ProductModel.aggregate([{ $match: filter }]);
            const options = {
                page: page,
                limit: limit,
                sort: { price: sortOrder },
            };

            return (
                await ProductModel
                    .aggregatePaginate(myAggregate, options)
            );
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
