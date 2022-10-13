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
let selectPay;
let cardPay;
let cashPay;
let erase;
let printing;
let check;
let priceT = /^[+-]?\d+([.]\d+)?$/; 
                                    
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
        errorArticle.textContent = "";
        article.style.border = 'thin solid black';
        price.style.border = 'thin solid red';
    }else{      
        addArticle();
        addPrices();
        article.style.border = 'thin solid black';
        price.style.border = 'thin solid black';
        article.value = "";
        errorArticle.textContent = "";
        errorPrice.textContent  = "";
    } 
}

/* Pablo: 1: Añado un else if extra, para que el usuario no pueda meter letras, únicamente números y que así no nos sume NaN.
     2: Añado también en el último else, que ambos mensaje de error se reseteen porque si te faltaba el articulo y tenias el precio o viceversa, 
     al completarlo después, se quedaba el mensaje de error en pantalla. De esta manera desaparecen. */

function addArticle() {
    if (article.value != ""){
        cart.push(article.value);
        showAllArticles();
        article.focus();
        article.style.border = 'thin solid black';
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
    price.value = ""; 
    price.style.border ='thin solid black';
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

//Jorge: he hecho un híbrido entre lo de Pablo y lo mío, para no poner tantas variables y utilizar las que ya teníamos. (ha dado la casualidad de que cuando lo he terminado me he dado cuenta que lo había hecho Pablo igual xD xD)
function showPay() {
    if(selectPay.value == "T"){
        cardPay.style.display = "block"; 
        cashPay.style.display = "none";
    }else if(selectPay.value == "E"){
        cardPay.style.display = "none";
        cashPay.style.display = "block";
        if(totalPrice.value == 0){
            totalAmount.value = 0;
        }else{
            totalAmount.value = totalPrice.value; 
        }
    }else{
        cardPay.style.display = "none";
        cashPay.style.display = "none";
    }
}

/* function ableCard() { 
    if(selection.value == 'T'){
        card.style.display = "block";
        cash.style.display = "none";
    }else if(selection.value == 'E'){
        cash.style.display = "block";
        card.style.display = "none";
        if(totalPrice.value == 0){
            totalAmount.value = 0;
        }else{
            totalAmount.value = total
        }
        
    } else{
        card.style.display = "none";
        cash.style.display = "none";
    }
   
} Pablo: En esta función a través del 'change', estoy accediendo a los valores con un if, si Elijo 'T', se me abre tarjeta y se me cierra Efectivo,
  Si elijo E, se me abre efectivo y se cierra tarjeta, para poder moverme entre ellas sin que se me colapsen y el else final cierra ambas cuando vuelves
  a la pestaña seleccionar
  
  Dentro del else if, meto un if-else anidado aprovechando para que me saque el importe total del carrito que llevemos, lo seteo a 0, si aún el usuario no ha introducido nada
  porque si no sale undefined y en cuanto hay articulos asignados se asigna automáticamente el monto que lleve. Para ese campo declaré una variable llamada totalAmount.*/

function ablePrint() {
    if(check.checked){
        printing.disabled = false;
    }else{
        printing.disabled = true;
    }
}

//Jorge: para sacar el alert al enviar el formulario.
function printForm(){
    let index = selectPay.selectedIndex;
    if(selectPay.value == "T" || selectPay.value == "E") {
        let option = window.confirm("Los artículos de mi carrito son: " + allArticles.value +"\n" +
                    "El precio total es: " + totalPrice.value + " €" + "\n" +
                    "Forma de pago: " + selectPay.options[index].text + "\n" +
                    "\n" + "¿Estás seguro de comprar estos artículos?"); // isra: cambio confirm por el alert que había y añado texto
        if(option == true){
            print();
        }
    }else{
        window.alert("Seleccione una forma de pago");
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
    selectPay = document.getElementById("selectWayToPay");
    cardPay = document.getElementById("cardPay");
    cashPay = document.getElementById("cashPay");
    totalAmount = document.getElementById('cashAmount');
    check = document.getElementById('terms');
    erase = document.getElementById('reset');
    printing = document.getElementById('print');
    // card = document.getElementById('cardP');
    // cash = document.getElementById('cashP');
    // selection = document.getElementById('wayToPay');
    // totalAmount = document.getElementById('cashAmount');
    // Pablo: inicializo mis variables, las cuales apuntan al select y a los divs de las formas de pago
};

function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    printing.addEventListener("click", printForm);
    check.addEventListener('change', ablePrint);
    selectPay.addEventListener("change", showPay);
    // selection.addEventListener('change',ableCard); Pablo: Genero solo un listener, con mi variable selection que apunta a select con id 'wayToPay' y referencio a la función ableCard
};

window.addEventListener("load",() =>{
    initVariables();
    initListeners();
    printing.disabled = true;
    // card.style.display = "none";
    // cash.style.display = "none"; Pablo: Dejo ambos sin desplegar, utilizo variables que previamente están apuntando a los div
});