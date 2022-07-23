// Pages titles
function setHtmlHeadTitle(title = "") {
  manageHtmlTag(document.querySelector("title"), {}, title);
}

function getUrlParam(paramName = "") {
  const paramValue = new URL(window.location.href).searchParams.get(paramName);
  return paramValue;
}

function getCart() {
  const cartFromLS = localStorage.getItem("cart");
  if (cartFromLS === null) return [];
  return JSON.parse(cartFromLS);
}

function saveCart(cart = []) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

function createHtmlTag(
  htmlTag = "div",
  attributes = {},
  content = "",
  appendTo = null
) {
  // Creating HTML tag element
  const tag = document.createElement(htmlTag);
  return manageHtmlTag(tag, attributes, content, appendTo);
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
    const value = attributes[attribute];
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

function addProductToCart(productId = "",
productColor = "",
quantity = 0) {
  if (
    productColor == null ||
    productColor == "" ||
    quantity == null ||
    quantity <= 0
  ) {
    alert("Sélectionnez une couleur/quantité");
    return false;
  }
  const productInfo = {
    id: productId,
    color: productColor,
    quantity: Number(quantity),
  };
  let cart = getCart();
  let key = findProductFromCart(productId, productColor);
  if (key == -1) {
    cart.push(productInfo);
    saveCart(cart);
  } else {
    updateProductQuantityFromCart(productId, productColor, quantity);
  }
  if (window.confirm(`Vous rendre au panier ?`))
    window.location.href = "cart.html";
}

function deleteProductToCart(productId = "", productColor = "", /*name*/) {
  let cart = getCart();
  let key = findProductFromCart(productId, productColor);
  cart.splice(0,1);
  saveCart(cart)

  /*
  for (i = 0; i < cart.length; i = 1){
    if (cart[i].name === name){
      cart.splice(i,1)
      return 
    }
  }
 */
}
function findProductFromCart(productId = "", productColor = "") {
  let cart = getCart();
  const resultFind = cart.findIndex(
    (el) => el.id === productId && el.color === productColor
  );
  return resultFind;
}

function updateProductQuantityFromCart(
  productId = "",
  productColor = "",
  quantity = 0
) {
  let cart = getCart();
  let key = findProductFromCart(productId, productColor);
  if (key == -1) return false;
  const newQuantity = parseInt(cart[key].quantity) + parseInt(quantity);
  cart[key].quantity = newQuantity;
  saveCart(cart);
}

// let myDiv1 = createHtmlTag('div');
// let myDiv2 = createHtmlTag('div', {class: "my-css-class"});
// let myDiv3 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div");
// let myDiv4 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div", document.querySelector("body"));
// let image = createHtmlTag("img", {src:''});
// const parent = document.querySelector(".item__img");
// if (parent != null) parent.appendChild(image);
// image.src = article.imageUrl

// manageHtmlTag(document.querySelector("title"), {}, "Kanap - " + name);
