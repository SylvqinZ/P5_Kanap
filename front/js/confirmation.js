const orderId = getUrlParam("orderId")
displayOrderId(orderId)


function displayOrderId(orderId) {
  const orderIdElement= document.getElementById("orderId")
  orderIdElement.textContent = orderId
}

