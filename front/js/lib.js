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
  // Forwarding process to manageHtmlTag
  for (const attribute in attributes) {
    const value = attributes[attribute];
    tag.setAttribute(attribute, value);
  }
  if (content != "") tag.textContent = content;

  if (appendTo != null) {
    appendTo.appendChild(tag);
  }
  return tag;
  // return manageHtmlTag(htmlTag, attributes, content, appendTo);
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

function addProductToCart(cartItem = {}) {
  
}
  
function deleteProductToCart(cartItem = {}) {}

function findProductFromCart(productId = "", productColor = "") {}

function updateProductQuantityFromCart(
  productId = "",
  productColor = "",
  quantity = 0
) {}




// let myDiv1 = createHtmlTag('div');
// let myDiv2 = createHtmlTag('div', {class: "my-css-class"});
// let myDiv3 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div");
// let myDiv4 = createHtmlTag('div', {class: "my-css-class"}, "Ceci est le contenu de ma div", document.querySelector("body"));
// let image = createHtmlTag("img", {src:''});
// const parent = document.querySelector(".item__img");
// if (parent != null) parent.appendChild(image);
// image.src = article.imageUrl

// manageHtmlTag(document.querySelector("title"), {}, "Kanap - " + name);
