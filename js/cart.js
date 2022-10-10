let cart = [];
let article;
let price;
let units
let add;
let allArticles;
let totalPrice;
let total;
let errorArticle;
let errorPrice;
let erase;
let printing;
let check;
let priceT = /^[+-]?\d+([,.]\d+)?$/; //Jorge: he puesto la expresión regular que hace los decimales (no dejo la anterior)
                                    // Isra-Pablo: visto pero queremos que nos saque el precio total primero


function addProduct() {
    if (article.value == "" && price.value == ""){
        errorArticle.textContent = "falta artículo";
        errorPrice.textContent = "falta precio";
    }else if (article.value == "" ){
        errorArticle.textContent = "falta artículo";
        errorPrice.textContent  = "";
    }else if (price.value == ""){
        errorPrice.textContent = "falta precio";
        price.focus();
        errorArticle.textContent = "";
    }else if (!priceT.test(price.value)){
        errorPrice.textContent = "tipo de dato incorrecto";
    }else{      
        addArticle();
        addPrices();
        errorArticle.textContent = "";
        errorPrice.textContent  = "";
    } /*Jorge: he retocado el código, cambiando el primer if para que si no pones ningún articulo y precio salga el error en los dos,
    antes solo salía el de precio si dejabas los dos en blanco*/

    /* Pablo: 1: Añado un else if extra, para que el usuario no pueda meter letras, únicamente números y que así no nos sume NaN.
     2: Añado también en el último else, que ambos mensaje de error se reseteen porque si te faltaba el articulo y tenias el precio o viceversa, 
     al completarlo después, se quedaba el mensaje de error en pantalla. De esta manera desaparecen. */
}

function addArticle() {
    if (article.value != ""){
        cart.push(article.value);
        showAllArticles();
        article.value = ""; //Jorge: añadido que se borre el campo cuando damos a "añadir"
        article.focus(); //Jorge: añadido que cuando damos a "añadir" después de borrar los campos vuelva el foco al nombre
    }else{
        errorArticle.textContent = "falta artículo";
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
    price.value = ""; //Jorge: añadido que se borre el campo cuando damos a "añadir"
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
        errorArticle.textContent = "falta precio";
    }
*/  
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
errorArticle = document.getElementById('spanName');
errorPrice = document.getElementById('spanArticlePrice');
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