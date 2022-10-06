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
let nameT = /^\D+$/; //Jorge: este no hace falta, no tiene que tener expresión regular el campo nombre.
let priceT = /^[+-]?\d+([,.]\d+)?$/; //Jorge: he puesto la expresión regular que hace los decimales (no dejo la anterior)

/*
function addProduct() {
    if (article.value != "" && price.value != ""){
        addArticle();
        addPrice();
    }
}
Jorge: sin esto, si metes un articulo sin precio, o viceversa, lo incluye en la lista.
Ojo que también hay que mirar que luego saque los errores de falta artículo y precio, hay que darle una vuelta
*/

/*
function addArticle() {
    if (article.value != ""){
        cartArticle.push(article.value);
        showAllArticles();
    }else{
        errorArticle.textContent = "falta artículo";
    }
}
Jorge: cuando se mete un valor en un array lo correcto es hacerlo con push si quieres que se incluya al final.
También habría que quitar el nameT ya que en el campo del nombre no pide eso (por ejemplo, si queremos poner KH7, Xbox360,...)
*/

function addArticle() {
    if(nameT.test(article.value)){
        cart = cart.concat(article.value);
        showAllArticles();
        
    }else{
        errorName.textContent = 'Debes poner un nombre de artículo válido';
    }
}

function addPrices() {
    parseFloat(total); 
    total = (price.value * units.value) + totalPrice.value;
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
    add.addEventListener('click',addArticle);
    add.addEventListener('click',addPrices);  
    erase.addEventListener('click',eraseForm);
    //Jorge: si se hace con lo que digo de addProducts, aquí no harían falta las dos primeras líneas.
    
};



window.addEventListener("load",() =>{
    initVariables();
    initListeners();
});