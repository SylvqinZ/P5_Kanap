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

function addingFormEventsListeners() {
  let form = document.querySelector(".cart__order__form");
  form.firstName.addEventListener("change", function () {
    validateFirstName();
  });
  form.lastName.addEventListener("change", function () {
    validateLastName();
  });
  form.address.addEventListener("change", function () {
    validateAddress();
  });
  form.city.addEventListener("change", function () {
    validateCity();
  });
  form.email.addEventListener("change", function () {
    validateEmail();
  });
}
addingFormEventsListeners();

function validateFormField(field, regex) {
  let errorMsg = field.nextElementSibling;
  if (regex.test(field.value)) {
    errorMsg.textContent = "";
    return true;
  } else {
    errorMsg.textContent = "Ce champ a été mal renseigné.";
    return false;
  }
}

function validateFirstName() {
  let form = document.querySelector(".cart__order__form");
  let firstNameRegExp = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  return validateFormField(form.firstName, firstNameRegExp);
}

function validateLastName() {
  let form = document.querySelector(".cart__order__form");
  let lastNameRegExp = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  return validateFormField(form.lastName, lastNameRegExp);
}

function validateAddress() {
  let form = document.querySelector(".cart__order__form");
  let addressRegExp = new RegExp("^[0-9A-ZÀ-ÿ-a-z,.' -]+$");
  return validateFormField(form.address, addressRegExp);
}

function validateCity() {
  let form = document.querySelector(".cart__order__form");
  let cityRegExp = new RegExp("^[A-ZÀ-ÿ-a-z,.' -]+$");
  return validateFormField(form.city, cityRegExp);
}

function validateEmail() {
  let form = document.querySelector(".cart__order__form");
  let emailRegExp = new RegExp(
    "^[A-Za-z0-9._-]+@[A-Za-z0-9.]+.[A-Za-z0-9-.]+$"
  );
  return validateFormField(form.email, emailRegExp);
}

function validateForm() {
  let isFormValid = true;
  if (validateFirstName() === false) isFormValid = false;
  if (validateLastName() === false) isFormValid = false;
  if (validateAddress() === false) isFormValid = false;
  if (validateCity() === false) isFormValid = false;
  if (validateEmail() === false) isFormValid = false;
  return isFormValid;
}

let btnForm = document.querySelector("form");
btnForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  const body = makeRequestBody();
  if (body.products.length > 0);
  {
    let isFormValid = validateForm();
    console.log(isFormValid);
    if (isFormValid === true) {
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
    } else {
      alert("Le formulaire n'a pas bien été renseigné");
    }
  }
}

function makeRequestBody() {
  const lastName = document.getElementById("lastName");
  const firstName = document.getElementById("firstName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  const ids = [];
  for (let i = 0; i < cart.length; i++) {
    ids.push(cart[i].id);
    console.log(ids);
  }
  const body = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: ids,
  };
  return body;
}
