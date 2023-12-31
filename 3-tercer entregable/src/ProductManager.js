import fs from 'fs';

export class ProductManager {

    constructor() {
        this.path = './products.json';
        this.nextId = 1;
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]', 'utf-8');
        }
    }

    async addProduct(product) {

        try {
            product.id = this.nextId;
            this.nextId++;
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    };

    async updateProduct(id, updatedProductData) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((product) => product.id === id);
            if (index !== -1) {
                updatedProductData.id = id;
                products[index] = updatedProductData;

                await fs.promises.writeFile(this.path, JSON.stringify(products));
            } else {
                console.log(`No se encontró un producto con ID ${id}.`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const updatedProducts = products.filter((product) => product.id !== id);

            if (products.length !== updatedProducts.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
                console.log(`El producto con el ID ${id} se ha eliminado.`);
            } else {
                console.log(`No se ha encontrado un producto en el ID ${id}.`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }


    async getProductById(idProduct) {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(productsJSON);
                const product = productsJS.find((product) => product.id === idProduct);
                return product;
            } else return [];
        } catch (error) {
            console.log(error);
        }


    }
};