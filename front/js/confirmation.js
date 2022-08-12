const orderId = getUrlParam("orderId");
const orderIdElement = document.getElementById("orderId");
displayOrderId(orderId);

// IF FOUNDED, DIPLAY ORDER ID, ELSE DISPLAY ERROR
function displayOrderId(orderId) {
  if (orderId == null || undefined) {
    document.querySelector(".confirmation").textContent = "ERROR 404";
  } else {
    localStorage.setItem("cart", "[]");
    orderIdElement.textContent = orderId;
  }
}
