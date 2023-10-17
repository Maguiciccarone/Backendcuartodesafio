const fs = require('fs');

class ProductManager {

    constructor() {
        this.path = './products.json';
        this.nextId = 1;
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

const productManager = new ProductManager();

const product1 = {
    title: "cuaderno",
    description: "cuaderno liso",
    price: 4000,
    thumbnail: "img cuaderno liso",
    code: 1234,
    stock: 10
};

const product2 = {
    title: "cuaderno",
    description: "cuaderno rayado",
    price: 4000,
    thumbnail: "img cuaderno rayado",
    code: 1235,
    stock: 10
}

const test = async () => {
    await productManager.addProduct(product1);
    await productManager.addProduct(product2);
    console.log('primer consulta', await productManager.getProducts());
    await productManager.deleteProduct(2);
};

test(); 
