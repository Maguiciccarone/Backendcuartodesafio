class ProductManager {

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.getProductByCode(code)) {
            console.log(`Ya existe un producto con el código ${code}. No se puede agregar.`);
            return;
        }
        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(product);

    }

    getProductByCode(code) {
        return this.products.find((product) => product.code === code);

    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        })
        return maxId;
    };


    getProducts() {
        return this.products;
    }

    getProductById(idProduct) {
        const product = this.products.find((product) => product.id === idProduct);

        if (!product) {
            console.log("Error: Producto no encontrado");
        }

        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct("cuaderno", "cuaderno liso", 3500, "imagen cuaderno", 1234, 8);
productManager.addProduct("cuaderno", "cuaderno rayado", 4000, "imagen cuaderno", 2345, 8);
console.log(productManager.getProducts());