const socketClient = io();

socketClient.on("saludoDesdeBack", (msg) => {
    console.log(msg);

    socketClient.emit("respuestaDesdeFront", "Muchas gracias");
});

socket.on("products", (data) => {
    const listProduct = document.getElementById("products");
    listProduct.innerHTML = " ";
    data.forEach((p) => {
        const items = `
        <div>
          <h3>${p.name}</h3>
          <p>$ ${p.price}</p>
          <p>Categoría: ${p.category}</p>
        </div>`;
        listProduct.innerHTML += items;
    });
});

socket.on("productAdded", (newProd) => {
    const listProduct = document.getElementById("products");
    const newItem = `
      <div>
        <h3>${newProd.name}</h3>
        <p>$ ${newProd.price}</p>
        <p>Categoría: ${newProd.category}</p>
      </div>`;

    listProduct.innerHTML = newItem + listProduct.innerHTML;
});

const SEND = (event) => {
    event.preventDefault();
    const form = document.getElementById('form');
    const dataForm = new FormData(form);
    const name = dataForm.get('name');
    const price = dataForm.get('price');
    const category = dataForm.get('category');
    const newProduct = { name, price, category };

    socket.emit("addProduct", newProduct);
    console.log(newProduct);
};

// const form = document.getElementById("form");
// const inputName = document.getElementById("name");
// const inputPrice = document.getElementById("price");
// const inputCategory = document.getElementById("category");
// const products = document.getElementById("products");

// form.onsubmit = (e) => {
//     e.preventDefault();
//     const name = inputName.value;
//     const price = inputPrice.value;
//     const category = inputCategory.value;
//     const product = { name, price, category };
//     socketClient.emit('newProduct', product);
//     inputName.value = ''
//     inputPrice.value = ''
//     inputCategory.value = ''
// };

// socketClient.on('arrayProducts', (productsArray) => {
//     let infoProducts = '';
//     productsArray.forEach(p => {
//         infoProducts += `${p.name} - $${p.price} - ${p.category} </br>`
//     })
//     products.innerHTML = infoProducts
// })

// socketClient.on('message', (msg) => {
//     console.log(msg);
// })