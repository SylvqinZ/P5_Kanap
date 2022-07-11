function getUrlParam(urlId){
    const url = new URL(window.location.href).searchParams.get(urlId)
    return url
}

function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  return cart;
}
