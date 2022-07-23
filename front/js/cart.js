setHtmlHeadTitle("Votre Panier - Kanap");
let cart = getCart();
let total = 0;
let itemQuantity = 0;

function renderCart() {
  for (let item of cart) {
    let url = `http://localhost:3000/api/products/${item.id}`;
    try {
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let cartItems = document.getElementById("cart__items");

          // ADDING ARTICLE

          let newCartItem = createHtmlTag(
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

          let itemImg = createHtmlTag(
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

          let content = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content" }),
            "",
            newCartItem
          );

          // ADDING PRODUCT DESCRIPTION

          let contentDescription = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__description" }),
            "",
            content
          );

          // PRODUCT NAME

          createHtmlTag(
            (htmlTag = "h2"),
            (attributes = {}),
            (innerHTML = data.name),
            content
          );

          // PRODUCT COLOR

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = item.color),
            content
          );

          // PRODUCT PRICE

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = `${data.price} €`),
            contentDescription
          );

          // ADDING CONTENT SETTINGS

          let contentSettings = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings" }),
            "",
            content
          );

          let contentSettingsQuantity = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings__quantity" }),
            "",
            contentSettings
          );

          // PRODUCT QUANTITY

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = "Qté"),
            contentSettingsQuantity
          );

          createHtmlTag(
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

          // DELETE PRODUCT

          let settingsDelete = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__settings__delete" }),
            "",
            contentSettings
          );

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = { class: "deleteItem" }),
            (innerHTML = "Supprimer"),
            settingsDelete
          );

          // DISPLAY CART PRICE & QUANTITY

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

          total += data.price * item.quantity;
          itemQuantity += parseInt(item.quantity);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

renderCart();

