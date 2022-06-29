let url = new URL(window.location.href);
let productId = url.searchParams.get('id');
console.log(productId);

fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((data) => handleData(data))
    .catch((err) => {
        console.log("error")
        console.log(err);
});


function handleData(sofa = '') {
    const {imageUrl, altTxt, name, colors, price, description } = sofa
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
};


function makeImage(imageUrl = '', altTxt = '') {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image) 
};


function makeTitle(name ='') {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
};


function makePrice(price ='') {
    const span = document.querySelector('#price')
    if (span != null) span.textContent = price
};


function makeDescription(description ='') {
    const p = document.querySelector('#description')
    if (p != null) p.textContent = description
};

function makeColors(colors ='') {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
};

const button = document.querySelector("#addToCart")
const added = function (){
    console.log('clicked');
}
button.addEventListener('click', added)

