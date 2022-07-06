let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((product) => sofa(product))
  .catch((err) => {
    console.log("error");
    console.log(err);
    alert("ERROR : can't find the back");
  });

function sofa(sofa = "") {
  const { imageUrl, altTxt, name, colors, price, description } = sofa;
  productPrice = price;
  imgUrl = imageUrl;
  altText = altTxt;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

function makeImage(imageUrl = "", altTxt = "") {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const parent = document.querySelector(".item__img");
  if (parent != null) parent.appendChild(image);
}

function makeTitle(name = "") {
  const h1 = document.querySelector("#title");
  if (h1 != null) h1.textContent = name;
}

function makePrice(price = "") {
  const span = document.querySelector("#price");
  if (span != null) span.textContent = price;
}

function makeDescription(description = "") {
  const p = document.querySelector("#description");
  if (p != null) p.textContent = description;
}

function makeColors(colors = "") {
  const select = document.querySelector("#colors");
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      select.appendChild(option);
    });
  }
}

const button = document.querySelector("#addToCart");
button.addEventListener("click", clicked);

function clicked() {
  const color = document.querySelector("#colors").value;
  const quantity = document.querySelector("#quantity").value;

  if (orderInvalid(color, quantity)) return;
  saveOrder(color, quantity);
  //redirectToCart()
}

//function redirectToCart(){
//  window.location.href = "#"
//}

function orderInvalid(color, quantity) {
  if (color == null || color === "" || quantity == null || quantity == 0) {
    alert("Selectionnez une couleur/quantitée");
    return true;
  }
  console.log("added to cart");
}

function saveOrder(color, quantity) {
  const productInfo = {
    id: productId,
    color: color,
    quantity: quantity,
    
  };

  let save = JSON.parse(localStorage.getItem("cart"));
  console.log(save);

  if (save) {
    save.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(save));
    console.log(save);
  } else {
    save = [];
    save.push(productInfo);
    localStorage.setItem("cart", JSON.stringify(save));
    console.log(save);
  }
}

let cartArray = JSON.parse(localStorage.getItem("cart"));
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
console.log(color.value);
console.log(quantity.value);
console.log(cartArray);



/*
const fusion = Object.assign({}, sofa, {
  teinte: `${select.value}`,
  //quantite: 1,
  quantite: `${selectQ.value}`,
});
console.log(fusion);



for (i = 0; i < cartArray.length; i++) {
  if (
    cartArray[i]._id == sofa._id &&
    cartArray[i].teinte != teinte.value &&
    cartArray[i].quantite != quantite.value &&
    cartArray[i]._id != sofa._id
  ) {
    return (
      console.log("nouveau"),
      cartArray.push(fusion),
      localStorage.setItem("cart", JSON.stringify(cartArray)),
      (cartArray = JSON.parse(localStorage.getItem("cart")))
    );
  }
}

return (cartArray = JSON.parse(localStorage.getItem("cart")));

/*else if (produitTableau != null) {
  for (i = 0; i < produitTableau.length; i++){
    console.log("test");
    if (
      produitTableau[i]._id == productData._id && 
        produitTableau[i].teinte == select.value 
        &&produitTableau[i].quantite == selectQ.value
        ){
        return (
          produitTableau[i].quantite++,
          console.log("quantite++"),
          localStorage.setItem(
            "produit",
            JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("produit")))
        );
      }
  }
  */

/*
const button = document.querySelector("#addToCart");
button.addEventListener("click", () => {
//const color = document.querySelector("#colors").value;
//const quantity = document.querySelector("#quantity").value;
//if (color == null || color === "" || quantity == null || quantity == 0) {
 // alert("Selectionnez une couleur/quantitée");
//}
console.log("added to cart");

let produitTableau = JSON.parse(localStorage.getItem("produit"));
const select = document.querySelector("#colors")
const selectQ = document.querySelector("#quantity")
console.log(select.value);
//console.log(selectQ.value);
console.log(produitTableau);
*/

/*const productInfo = {
id: productId,
color: color,
quantity: quantity,
};
*/
//let produitTableau = JSON.parse(localStorage.getItem("cart"));
//console.log(produitTableau);

/*
const fusionProduitTeinte = Object.assign({}, productData, {
  teinte:`${select.value}`,
  //quantite: 1,
  quantite : `${selectQ.value}`
})
console.log(fusionProduitTeinte);

if (produitTableau == null) {
  produitTableau = [];
  produitTableau.push(fusionProduitTeinte);
  console.log(produitTableau);
  localStorage.setItem("produit", JSON.stringify(produitTableau));
} else if (produitTableau != null) {
  for (i = 0; i < produitTableau.length; i++){
    console.log("test");
    if (
      produitTableau[i]._id == productData._id && 
        produitTableau[i].teinte == select.value 
        &&produitTableau[i].quantite == selectQ.value
        ){
        return (
          produitTableau[i].quantite++,
          console.log("quantite++"),
          localStorage.setItem(
            "produit",
            JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("produit")))
        );
      }
  }
  for (i = 0; i < produitTableau.length; i++) {
    if (produitTableau[i]._id == productData._id && produitTableau[i].teinte != select.value 
      && produitTableau[i].quantite != selectQ.value 
      && produitTableau[i]._id != productData._id) {
      return (console.log("nouveau"),
      produitTableau.push(fusionProduitTeinte),
      localStorage.setItem("produit", JSON.stringify(produitTableau)),
      (produitTableau = JSON.parse(localStorage.getItem("produit")))
      ) 
    }
  }
}
return (produitTableau = JSON.parse(localStorage.getItem("produit")));
});
/*
if (produitTableau) {
  produitTableau.push(fusionProduitTeinte);
  localStorage.setItem("produit", JSON.stringify(produitTableau));
  console.log(produitTableau);
} else {
  produitTableau = [];
  produitTableau.push(produitTableau);
  localStorage.setItem("produit", JSON.stringify(produitTableau));
  console.log(produitTableau);
  if (produitTableau != null) {
    for (let i = 0; i < localStorage.length; i++) {
      localStorage.key(i);
      
    }
  }
}
*/
