const socketClient = io();

socketClient.on("saludoDesdeBack", (msg) => {
    console.log(msg);

    socketClient.emit("respuestaDesdeFront", "Muchas gracias");
});
const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputCategory = document.getElementById("category");
const products = document.getElementById("products");

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const category = inputCategory.value;
    const product = { name, price, category };
    socketClient.emit('newProduct', product);
    inputName.value = ''
    inputPrice.value = ''
    inputCategory.value = ''
};

socketClient.on('arrayProducts', (productsArray) => {
    let infoProducts = '';
    productsArray.forEach(p => {
        infoProducts += `${p.name} - $${p.price} - ${p.category} </br>`
    })
    products.innerHTML = infoProducts
})

socketClient.on('message', (msg) => {
    console.log(msg);
})