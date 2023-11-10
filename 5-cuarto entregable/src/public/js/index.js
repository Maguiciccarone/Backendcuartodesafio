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
          <h3>${p.title}</h3>
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
        <h3>${newProd.title}</h3>
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

