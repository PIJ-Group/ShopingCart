let cart = [];
let article;
let price;
let units
let add;
let allArticles;
let totalPrice;
let total;
let errorName;
let errorArticle;
let erase;
let priceT = /^[+-]?\d+([,.]\d+)?$/; //Jorge: he puesto la expresión regular que hace los decimales (no dejo la anterior)
                                    // Isra-Pablo: visto pero queremos que nos saque el precio total primero

function addProduct() { //Isra-Pablo: saca error cuando dejas algun campo vacío donde le corresponde
    if (article.value != "" && price.value != ""){
        addArticle();
        addPrices();
        errorName.textContent = "";
        errorArticle.textContent  = "";
    }else if (article.value == "" ){
        errorName.textContent = "falta artículo";
        errorArticle.textContent  = "";
    }else if (price.value == ""){
        errorArticle.textContent = "falta precio"
        errorName.textContent = "";
    }
}

function addArticle() {
    if (article.value != ""){
        cart.push(article.value);
        showAllArticles();
    }else{
        errorName.textContent = "falta artículo";
    }
}

function addPrices() {
    /*
    let p = Number(price.value);
    typeof p;
    let u = Number(units.value);
    typeof u;
    let tp = Number(totalPrice.value);
    typeof tp;

    total = (p * u) + tp;
    showTotalPrice(); 
                                           Pablo: Resolución del problema de la suma, convirtiendo todos los strings a number. Resultado: suma en vez de concatenar.
                                           Si dejamos este metodo se borrarian estas dos líneas:

                                            total = (price.value * units.value) + totalPrice.value;
                                            showTotalPrice();  */
    
    total = (price.value * units.value) + totalPrice.value;
    showTotalPrice();
    total = parseFloat(total); //Isra - Pablo: lo pasa a Float, pero seguimos concatenando
    
    article.value = "";
    price.value = "";
    units.value = 1;  
}

function showAllArticles() {
    allArticles.value = cart.join(", ");
}

function showTotalPrice() {
    
    totalPrice.value = total;
    
}


function eraseForm() {
    location.reload();
}


function initVariables() {
article = document.getElementById('articleName');
price = document.getElementById('articlePrice');
units = document.getElementById('units');
add = document.getElementById('add');
allArticles = document.getElementById('cartArticles');
totalPrice = document.getElementById('totalPrice');
errorName = document.getElementById('spanName');
errorArticle = document.getElementById('spanArticlePrice');
erase = document.getElementById('reset');

};

function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
        
};


window.addEventListener("load",() =>{
    initVariables();
    initListeners();
});