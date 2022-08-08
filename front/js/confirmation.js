const orderId = getUrlParam("orderId")
displayOrderId(orderId)


function displayOrderId(orderId) {
  if (orderId == null || undefined) {
    document.querySelector('.confirmation').textContent = 'ERROR 404';
  } else {
  localStorage.setItem('cart', '[]')
  const orderIdElement= document.getElementById("orderId")
  orderIdElement.textContent = orderId
}
}

