/*function getUrlParam(paramName = "") {
  const url = new URL(window.location.href).searchParams.get(paramName);
  return url;
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  return cart;
}

function saveCart() {

}
*/

// Pages titles
function setHtmlHeadTitle(title = "") {
  manageHtmlTag(document.querySelector("title"), {}, title);
}

function getUrlParam(paramName = "") {
  const paramValue = new URL(window.location.href).searchParams.get(paramName);
  return paramValue;
}
function createHtmlTag(
    htmlTag = "div",
    attributes = {},
    content = "",
    appendTo = null
  ) {
    // Creating HTML tag element
    let tag = document.createElement(htmlTag);
    // Forwarding process to manageHtmlTag
    for (const attribute in attributes) {
      let value = attributes[attribute];
      tag.setAttribute(attribute, value);
    }
    if (content != "") tag.textContent = content;
  
    if (appendTo != null) {
      appendTo.appendChild(tag);
    }
    return tag;
    //return manageHtmlTag(htmlTag, attributes, content, appendTo);
}

function manageHtmlTag(
  tag = null,
  attributes = {},
  content = "",
  appendTo = null
) {
  if (tag == null) {
    alert("htmlTag invalid");
    return false;
  }
  // Filling HTML attributes
  for (const attribute in attributes) {
    let value = attributes[attribute];
    tag.setAttribute(attribute, value);
  }
  // Filling text content
  if (content != "") tag.textContent = content;
  // Appending HTML tag to ???
  if (appendTo != null) {
    appendTo.appendChild(tag);
  }
  // Returning HTML tag
  return tag;
}
/*function makeImage(imageUrl = "", altTxt = "") {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    const parent = document.querySelector(".item__img");
    if (parent != null) parent.appendChild(image);
  }
*/



// let myDiv1 = createHtmlTag('div');
// let myDiv2 = createHtmlTag('div', {class: "my-css-class"});
// let myDiv3 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div");
// let myDiv4 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div", document.querySelector("body"));
//let image = createHtmlTag("img", {src:''});
//const parent = document.querySelector(".item__img");
//if (parent != null) parent.appendChild(image);
//image.src = article.imageUrl

// manageHtmlTag(document.querySelector("title"), {}, "Kanap - " + name);

function getCart() {
  let cartFromLS = localStorage.getItem("cart");
  if (cartFromLS === null) return [];
  return JSON.parse(cartFromLS);
}

function saveCart(cart = []) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

function addProductToCart(cartItem = {}) {}

function findProductFromCart(productId = "", productColor = "") {}

function updateProductQuantityFromCart(
  productId = "",
  productColor = "",
  quantity = 0
) {}

function deleteProductToCart(cartItem = {}) {}

function addToCart() {
  let cart = getCart();
  const productColor = document.querySelector("#colors").value;
  const productQuantity = document.querySelector("#quantity").value;
  const productInfo = {
    id: productId,
    color: productColor,
    quantity: Number(productQuantity),
  };

  if (
    productColor == null ||
    productColor == "" ||
    productQuantity == null ||
    productQuantity == 0
  ) {
    alert("Sélectionnez une couleur/quantité");
    return true;
  }
  if (window.confirm(`Vous rendre au panier ?`))
    window.location.href = "cart.html";

  if (cart) {
    const resultFind = cart.find(
      (el) => el.id === productId && el.color === productColor
    );

    if (resultFind) {
      let newQuantity =
        parseInt(productInfo.quantity) + parseInt(resultFind.quantity);
      resultFind.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    } else {
      cart.push(productInfo);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    }
  } else {
    cart.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }
}
