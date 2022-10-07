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
let printing;
let check;
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
    
    let p = Number(price.value);
    //typeof p;
    let u = Number(units.value);
    //typeof u;
    let tp = Number(totalPrice.value);
    //typeof tp;
                    //Isra: dejo comentados los typeOf, que funciona sin ellos y no entiendo que hacen
    total = (p * u) + tp;
    showTotalPrice(); 
                                         
    
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

function ablePrint() { //Isra; para deshabilitar o habilitar boton imprimir
    if(check.checked){
        printing.disabled = false;
    }else{
        printing.disabled = true;
    }
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
printing = document.getElementById('print');
check = document.getElementById('terms');
erase = document.getElementById('reset');

};

function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    check.addEventListener('change', ablePrint);    
};


window.addEventListener("load",() =>{
    initVariables();
    initListeners();
    printing.disabled = true;
});