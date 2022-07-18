fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => renderSofa(data))
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

setHtmlHeadTitle("Les meilleurs canapé de Paris - Kanap");

function renderSofa(data = []) {
  data.forEach((sofa) => {
    const { _id, imageUrl, altTxt, name, description } = sofa;
    const article = document.createElement("article");
    const anchor = createHtmlTag(
      (htmlTag = "a"),
      (attributes = { src: _id, href: `./product.html?id=${_id}` }),
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
