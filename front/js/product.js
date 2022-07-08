let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((product) => sofa(product))
  .catch((err) => {
    console.log("error");
    console.log(err);
    alert();
  });

function sofa(sofa = "") {
  const { imageUrl, altTxt, name, colors, price, description } = sofa;
  //productPrice = price;
  //imgUrl = imageUrl;
  //altText = altTxt;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl = "", altTxt = "") {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name = "") {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function makePrice(price = "") {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

function makeDescription(description = "") {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}

function makeColors(colors = "") {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.querySelector("#addToCart");
button.addEventListener("click", clicked);

function clicked() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (orderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
  //redirectToCart();
}

function redirectToCart() {
  window.location.href = "cart.html";
}

function orderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Selectionnez une couleur/quantitée");
    return true;
  }
  console.log("added to cart");
}

function saveOrder(color, quantity) {
  let productInfo = {
    id: productId,
    colors: color,
    quantities: Number(quantity),
  };

  let save = JSON.parse(localStorage.getItem("cart"));
  console.log(save);

  if (save) {
    const resultFind = save.find(
      (el) => el.id === productId && el.colors === color
    );
    //Si le produit commandé est déjà dans le panier
    if (resultFind) {
      let newQuantite =
        parseInt(productInfo.quantities) + parseInt(resultFind.quantities);
      resultFind.quantities = newQuantite;
      localStorage.setItem("cart", JSON.stringify(save));
      console.log(save);
    } else {
      save.push(productInfo);
      localStorage.setItem("cart", JSON.stringify(save));
      console.log(save);
    }
  } else {
    save = [];
    save.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(save));
    console.log(save);
  }
}
