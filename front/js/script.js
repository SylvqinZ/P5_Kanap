fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
    

function addProducts(products) {
    const imageUrl = products[0].imageUrl
    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = " kanap sinopé"
    const items = document.getElementById("items")
    if (items != null){
        items.appendChild(anchor)
    }   
}