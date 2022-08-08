setHtmlHeadTitle("Votre Panier - Kanap");
let cart = getCart();
let total = 0;
let itemQuantity = 0;

// RECOVER PRODUCT DATA FROM THE API & RENDER DATA
function renderCart() {
  for (let item of cart) {
    let url = `http://localhost:3000/api/products/${item.id}`;
    try {
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const cartItems = document.getElementById("cart__items");

          // ADDING ARTICLE

          const newCartItem = createHtmlTag(
            (htmlTag = "article"),
            (attributes = {
              class: "cart__item",
              dataId: item.id,
              dataColor: item.color,
            }),
            "",
            cartItems
          );

          // ADDING PRODUCT IMAGE

          const itemImg = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__img" }),
            "",
            newCartItem
          );

          createHtmlTag(
            (htmlTag = "img"),
            (attributes = { src: data.imageUrl, alt: data.altTxt }),
            "",
            itemImg
          );

          const content = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content" }),
            "",
            newCartItem
          );

          // ADDING PRODUCT DESCRIPTION

          const contentDescription = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__description" }),
            "",
            content
          );

          // ADDING PRODUCT NAME

          createHtmlTag(
            (htmlTag = "h2"),
            (attributes = {}),
            (innerHTML = data.name),
            content
          );

          // ADDING PRODUCT COLOR

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = item.color),
            content
          );

          // ADDING PRODUCT PRICE

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = `${data.price} €`),
            contentDescription
          );

          // ADDING CONTENT SETTINGS

          const contentSettings = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings" }),
            "",
            content
          );

          const contentSettingsQuantity = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings__quantity" }),
            "",
            contentSettings
          );

          // ADDING PRODUCT QUANTITY

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = "Qté"),
            contentSettingsQuantity
          );

          const quantityInput = createHtmlTag(
            (htmlTag = "input"),
            (attributes = {
              class: "itemQuantity",
              type: "number",
              name: "itemQuantity",
              min: "1",
              max: "100",
              value: item.quantity,
            }),
            "",
            contentSettingsQuantity
          );

          quantityInput.addEventListener("change", function (event) {
            console.log(this.value);
            console.log(item.id);
            console.log(item.color);
            updateProductQuantityFromCart(
              item.id,
              item.color,
              quantityInput.value
            );
            window.location.reload();
          });

          // ADDING DELETE PRODUCT

          const settingsDelete = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings__delete" }),
            "",
            contentSettings
          );

          let deleteBtn = createHtmlTag(
            (htmlTag = "p"),
            (attributes = { class: "deleteItem" }),
            (innerHTML = "Supprimer"),
            settingsDelete
          );

          deleteBtn.addEventListener("click", function (event) {
            console.log(event);
            console.log(item.id);
            console.log(item.color);
            deleteProductToCart(item.id, item.color);
            window.location.reload();
          });

          // DISPLAY CART PRICE & QUANTITY

          total += parseInt(data.price) * parseInt(item.quantity);
          itemQuantity += parseInt(item.quantity);

          manageHtmlTag(
            document.querySelector("#totalPrice"),
            {},
            (innerHTML = total)
          );
          manageHtmlTag(
            document.querySelector("#totalQuantity"),
            {},
            (innerHTML = itemQuantity)
          );
        });
    } catch (error) {
      console.log(error);
    }
  }
}
renderCart();

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  submitForm();
});

function submitForm() {
  const body = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location = "confirmation.html?orderId=" + data.orderId;
    })

    .catch(function (err) {
      console.log(err);
    });
}

const nameRegex = /^[A-ZÀ-ÿ-a-z,.' -]+$/;
const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.]+\.[A-Za-z0-9-.]+$/;

function makeRequestBody() {
  const ids = [];
  const lastName = document.getElementById("lastName").value;
  const firstName = document.getElementById("firstName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  if (nameRegex.test(firstName & lastName) === false) {
    alert("Veuillez remplir le formulaire");
    return true;
  }

  if (emailRegex.test(email) === false) {
    alert("L'adresse email est mal renseigné");
    return true;
  }
  for (let i = 0; i < cart.length; i++) {
    ids.push(cart[i].id);
    console.log(ids);
  }
  const body = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: ids,
  };
  console.log(body);
  return body;
}
