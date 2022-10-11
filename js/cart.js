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
let card;
let cardPay;
let cash;
let cashPay;
let erase;
let printing;
let check;
let priceT = /^[+-]?\d+([.]\d+)?$/; //Jorge: he puesto la expresión regular que hace los decimales (no dejo la anterior)
                                    // Isra-Pablo: visto pero queremos que nos saque el precio total primero


function addProduct() {
    if (article.value == "" && price.value == ""){
        errorArticle.textContent = "falta artículo";
        article.style.border = 'thin solid red';
        errorPrice.textContent = "falta precio";
        price.style.border = 'thin solid red';
    }else if (article.value == "" ){
        errorArticle.textContent = "falta artículo";
        article.style.border = 'thin solid red';
        price.style.border = 'thin solid black';
        errorPrice.textContent  = "";
    }else if (price.value == ""){
        errorPrice.textContent = "falta precio";
        price.style.border = 'thin solid red';
        article.style.border = 'thin solid black';
        price.focus();
        errorArticle.textContent = "";
    }else if (!priceT.test(price.value)){
        errorPrice.textContent = "tipo de dato incorrecto";//isra: salta de linea en el formulario revisar
        price.style.border = 'thin solid red';
    }else{      
        addArticle();
        article.style.border = 'thin solid black';
        addPrices();
        price.style.border = 'thin solid black';
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
        article.style.border = 'thin solid black'; // pone el borde de nuevo negro para sigiuente interacción
    }else{
        errorArticle.textContent = "falta artículo";
        article.style.border = 'thin solid red';
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
    price.style.border ='thin solid black';// pone el borde de nuevo negro para sigiuente interacción
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

/*
    Jorge: básicamente lo que he creado ha sido una variable interna que recoge el índice de la opción que pinchas en ese momento.
    En los listener la condición del escuchador es el change, entonces cuando el card hace change, con el selectedIndex recoged donde para.
    Luego ese índice lo pasas como "argumento" del options (como cuando sacas el valor de un array mediante su índice) y le dices que te muestre el value (que nosotros tenemos con T y E en HTML).
    Y por último, en el else lo vuelves a dejar en none porque si cambias entre ellos, se quedan las dos visibles una debajo de otra.
    OJO PARA LA SIGUIENTE!! Lo que no me funcionaba era acceder mediante el ClassName, no se si por estar mal escrito o por que, en cuanto he metido ID lo ha hecho perfect, me estaba volviendo loco por eso.
    Mañana le echo un vistazo porque haciendo un else if, puedes meter las dos funciones en una, ahorramos codificación, y cuando volvemos al seleccione podemos hacer que se vuelva a quedar con el mismo hueco.
    Además si volvemos al Seleccione (no tiene sentido que se vuelva pero bueno) se queda en los 10 que le ponemos, mañana le pongo para que pase de nuevo a 70px.
*/
function showCardPay() {
    let index = card.selectedIndex;
    if(card.options[index].value == "T"){
        cardPay.style.display = "block"; 
        card.style.marginBottom = "10px";
    }else{
        cardPay.style.display = "none";
    }
}

function showCashPay() {
    let index = cash.selectedIndex;
    if(cash.options[index].value == "E"){
        cashPay.style.display = "block";
        card.style.marginBottom = "10px";
    }else{
        cashPay.style.display = "none";
    }
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
    card = document.getElementById("selectWayToPay");//Jorge: prueba display
    cardPay = document.getElementById("cardPay");//Jorge: prueba display
    cash = document.getElementById("selectWayToPay");//Jorge: prueba display
    cashPay = document.getElementById("cashPay");//Jorge: prueba display
    check = document.getElementById('terms');
    erase = document.getElementById('reset');
    printing = document.getElementById('print');
};

function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    check.addEventListener('change', ablePrint);
    card.addEventListener("change", showCardPay);//Jorge: prueba display
    cash.addEventListener("change", showCashPay);//Jorge: prueba display
};

window.addEventListener("load",() =>{
    initVariables();
    initListeners();
    printing.disabled = true;
});