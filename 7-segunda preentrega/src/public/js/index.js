const socket = io();

socket.on("products", (data) => {
  const listProduct = document.getElementById("listProducts");
  listProduct.innerHTML = " ";
  data.forEach((element) => {
    const items = `
      <div>
        <h3>${element.title}</h3>
        <p>$ ${element.price}</p>
        <p>${element.category}</p>
      </div>`;
    listProduct.innerHTML += items;
  });
});

socket.on("productAdded", (newProduct) => {
  const listProduct = document.getElementById("listProducts");
  const newItem = `
    <div>
      <h3>${newProduct.title}</h3>
      <p>$ ${newProduct.price}</p>
      <p>${newProduct.category}</p>
    </div>`;

  listProduct.innerHTML = newItem + listProduct.innerHTML;
});

const SEND = (event) => {
  event.preventDefault();
  const form = document.getElementById('form');
  const dataForm = new FormData(form);
  const title = dataForm.get('title');
  const price = dataForm.get('price');
  const category = dataForm.get('category');
  const newProduct = { title, price, category };

  socket.emit("addProduct", newProduct);
  console.log(newProduct);
};



