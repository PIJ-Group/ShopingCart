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

function addProduct() {
    if (article.value == "" && price.value == ""){
        errorName.textContent = "falta artículo";
        errorArticle.textContent = "falta precio";
    }else if (article.value == "" ){
        errorName.textContent = "falta artículo";
        errorArticle.textContent  = "";
    }else if (price.value == ""){
        errorArticle.textContent = "falta precio"
        errorName.textContent = "";
    }else{      
        addArticle();
        addPrices();
    } /*Jorge: he retocado el código, cambiando el primer if para que si no pones ningún articulo y precio salga el error en los dos,
    antes solo salía el de precio si dejabas los dos en blanco*/
}

function addArticle() {
    if (article.value != ""){
        cart.push(article.value);
        showAllArticles();
    }else{
        errorName.textContent = "falta artículo";
    }
}

function addPrices(price) {
    
    let p = Number(price.value);
    //typeof p;
    let u = Number(units.value);
    //typeof u;
    let tp = Number(totalPrice.value);
    //typeof tp;

    total = (p * u) + tp;
    showTotalPrice(); 
                                          
    total = (price.value * units.value) + totalPrice.value;
    showTotalPrice();
   
    //Isra: dejo comentados los typeOf, que funciona sin ellos y no entiendo que hacen


    /*
    total = (price.value * units.value) + totalPrice.value; //Jorge: lo sigue concatenando porque aquí ya sigue en String haciendo cosas, entonces cuando hagas el parseint ya esta mal.
    showTotalPrice();
    total = parseFloat(total); //Isra - Pablo: lo pasa a Float, pero seguimos concatenando
    */

    article.value = "";
    price.value = "";
    units.value = 1;

    /* Jorge: tengo que seguir probando, dejádmelo por aquí pls
    total;
    p = parseFloat(price);
    console.log(p);
    console.log(typeof(p));
    if (p.value != ""){
        total += (p.value*units.value);
        showAllArticles();
    }else{
        errorName.textContent = "falta precio";
    }
*/  
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