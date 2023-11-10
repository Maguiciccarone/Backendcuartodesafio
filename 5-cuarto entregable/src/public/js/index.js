const socketClient = io();

socketClient.on("saludoDesdeBack", (msg) => {
    console.log(msg);

    socketClient.emit("respuestaDesdeFront", "Muchas gracias");
});

socket.on("products", (data) => {
    const listProduct = document.getElementById("products");
    listProduct.innerHTML = " ";
    data.forEach((newProd) => {
        const items = `
        <div>
          <h3>${newProd.name}</h3>
          <p>$ ${newProd.price}</p>
          <p>Categoría: ${newProd.category}</p>
        </div>`;
        listProduct.innerHTML += items;
    });
});

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const category = inputCategory.value;
    const product = { name, price, category };
    socketClient.emit("addProduct", product);
    inputName.value = ''
    inputPrice.value = ''
    inputCategory.value = ''
};

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





