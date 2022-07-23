const productId = getUrlParam((paramName = "id"));
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((product) => sofa(product))
  .catch((err) => {
    console.log("error");
    console.log(err);
    alert();
  });

function sofa(sofa = "") {
  const { imageUrl, altTxt, name, colors, price, description } = sofa;

  // GET PRODUCT COLORS
  const option = document.querySelector("#colors");
  if (option != null) {
    colors.forEach((color) => {
      createHtmlTag(
        (htmlTag = "option"),
        (attributes = { value: color }),
        (textContent = color),
        option
      );
    });

    // GET PRODUCT NAME PAGE TITLE
    setHtmlHeadTitle(`${name} - Kanap`);

    // CREATE IMAGES
    const image = createHtmlTag(
      (htmlTag = "img"),
      (attributes = { src: imageUrl, alt: altTxt })
    );
    const parent = document.querySelector(".item__img");
    if (parent != null) parent.appendChild(image);
    // GET PRODUCT TITLE / PRICE / DESCRIPTION
    manageHtmlTag(document.querySelector("#title"), {}, (textContent = name));
    manageHtmlTag(document.querySelector("#price"), {}, (textContent = price));
    manageHtmlTag(
      document.querySelector("#description"),
      {},
      (textContent = description)
    );
  }
}

// ADD PRODUCTS TO CART

const button = document.querySelector("#addToCart");
button.addEventListener("click", function(event) {
  const productColor = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;
  addProductToCart(productId, productColor, quantity);
});
