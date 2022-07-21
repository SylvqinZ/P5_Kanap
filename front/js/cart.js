/*<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                    */
let cart = getCart();
let total = 0;
let itemQuantity = 0;

//if there are products in the cart,render products from the cart,based on their ID in the cart, and with data from corresponding ID in the API, on page load.
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

          let contentDescription = createHtmlTag(
            (htmlTag = "div"),
            (attributes = { class: "cart__item__content__description" }),
            "",
            content
          );

          createHtmlTag(
            (htmlTag = "h2"),
            (attributes = {}),
            (innerHTML = data.name),
            content
          );

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = item.color),
            content
          );

          createHtmlTag(
            (htmlTag = "p"),
            (attributes = {}),
            (innerHTML = `${data.price} €`),
            contentDescription
          );

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
          total += data.price * item.quantity;
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
