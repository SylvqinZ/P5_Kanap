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

function addProductToCart(productId = "", productColor = "", quantity = 0) {
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
  let index = findProductFromCart(productId, productColor);
  if (index == -1) {
    cart.push(productInfo);
    saveCart(cart);
  } else {
    let newQuantity = parseInt(cart[index].quantity) + productInfo.quantity
    updateProductQuantityFromCart(productId, productColor, newQuantity);
  }
  if (window.confirm(`Vous rendre au panier ?`))
    window.location.href = "cart.html";
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
  let index = findProductFromCart(productId, productColor);
  if (index == -1) return false;
  const newQuantity = parseInt(quantity);
  cart[index].quantity = newQuantity;
  saveCart(cart);
}

function deleteProductToCart(productId = "", productColor = "") {
  let cart = getCart();
  let index = findProductFromCart(productId, productColor);
  cart.splice(index, 1);
  saveCart(cart);
}