const orderId = getUrlParam("orderId")
displayOrderId(orderId)


function displayOrderId(orderId) {
  localStorage.setItem('cart', '[]')
  const orderIdElement= document.getElementById("orderId")
  orderIdElement.textContent = orderId
}

