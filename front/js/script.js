fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => addProducts(products))
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

setHtmlHeadTitle("Les meilleurs canapé de Paris - Kanap");

function addProducts(sofas = []) {
  sofas.forEach((sofa) => {
    const { _id, imageUrl, altTxt, name, description } = sofa;
    //const anchor = makeAnchor(_id);
    //const image = makeImage(imageUrl, altTxt);
    //const h3 = makeH3(name);
    //const p = makeParagraph(description);
    const article = document.createElement("article");
    const anchor = createHtmlTag(
      (htmlTag = "a"),
      (attributes = { src: _id, href: "./product.html?id=" + _id }),
      (content = ""),
      article
    );
    const p = createHtmlTag(
      (htmlTag = "p"),
      (attributes = { src: description, class: "productDescription" }),
      (textContent = description),
      article
    );
    const image = createHtmlTag(
      (htmlTag = "img"),
      (attributes = { src: imageUrl, alt: altTxt }),
      article
    );
    const h3 = createHtmlTag(
      (htmlTag = "h3"),
      (attributes = { src: name, class: "productName" }),
      (textContent = name),
      article
    );

    appendElementsToArticle(article, image, h3, p);
    appendArticleToAnchor(anchor, article);
  });
}

function appendElementsToArticle(article = "", image = "", h3 = "", p = "") {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}

function appendArticleToAnchor(anchor = "", article = "") {
  const items = document.getElementById("items");
  if (items != null) {
    items.appendChild(anchor);
    anchor.appendChild(article);
  }
}



/*
function makeAnchor(id = "") {
  const anchor = document.createElement("a");
  anchor.href = "./product.html?id=" + id;
  return anchor;
}


function makeImage(imageUrl = "", altTxt = "") {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}

function makeH3(name = "") {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

function makeParagraph(description = "") {
  const p = document.createElement("p");
  p.textContent = description;
  p.classList.add("productDescription");
  return p;
}
*/
