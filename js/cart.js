//Declaración de variables
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
let cashDelivered;
let erase;
let printing;
let check;
let option;
let priceT = /^[+-]?\d+([.]\d+)?$/; 
 
// Verifica que no hay elementos erróneos a introducir en el carrito, ni campos vacíos
// en ese caso, agrega artículo y precio.
function addProduct() {
    if (article.value == "" && price.value == ""){
        errorArticle.textContent = 'falta artículo';
        article.style.border = 'thin solid red';
        errorPrice.textContent = 'falta precio';
        price.style.border = 'thin solid red';
    }else if (article.value == "" ){
        errorArticle.textContent = 'falta artículo';
        article.style.border = 'thin solid red';
        price.style.border = 'thin solid black';
        errorPrice.textContent  = "";
    }else if (price.value == ""){
        errorPrice.textContent = 'falta precio';
        price.style.border = 'thin solid red';
        article.style.border = 'thin solid black';
        price.focus();
        errorArticle.textContent = "";
    }else if (!priceT.test(price.value)){
        errorPrice.textContent = 'tipo de dato incorrecto';
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

// Agrega los artículos al array y llama a la función que los va mostrando.
function addArticle() {    
    cart.push(article.value);
    showAllArticles();   
}

// Suma los precios de los artículos que se añaden al carrito.
function addPrices() {    
    let p = Number(price.value);
    let u = Number(units.value);
    let tp = Number(totalPrice.value);
    
    total = (p * u) + tp;
    showTotalPrice();
    price.value = ""; 
    price.style.border ='thin solid black';
    units.value = 1;
}

// Saca el array de artículos del carrito separados por una ",".
function showAllArticles() {
    allArticles.value = cart.join(", ");
}

// Muestra el precio total del carrito.
function showTotalPrice() {   
    totalPrice.value = total.toFixed(2);   
}

// Muestra u oculta las secciones de formulario según la forma de pago elegida.
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

// Calcula las vueltas del pago en efectivo.
function cashBack(){
    if(cashDelivered.value < totalPrice.value){
        return 'El efectivo entregado no es suficiente roñoso';
    }else {
        let rounding = (cashDelivered.value - totalPrice.value);
        return rounding.toFixed(2) + ' €';
    }
}
/* function cashBack(){
    let rounding = Number(cashDelivered.value);
    if(rounding < totalPrice.value){
        return 'El efectivo entregado no es suficiente roñoso';
    }else {
        rounding -= totalPrice.value;
        return rounding.toFixed(2) + ' €';
    }
} */

// Habilita el botón "Imprimir" cuando se marca el checkbox de las condiciones de compra.
function ablePrint() {
    if(check.checked){
        printing.disabled = false;
    }else{
        printing.disabled = true;
    }
}

// Saca una ventana modal con los datos de la compra, o alerta
// cuando no se ha seleccionado una forma de pago.
function printForm(){
    let index = selectPay.selectedIndex;
    if(selectPay.value == "T" || selectPay.value == "E") {
        option = window.confirm('Los artículos de mi carrito son: ' + allArticles.value +"\n" +
                    'El precio total es: ' + totalPrice.value + ' €' + '\n' +
                    'Forma de pago: ' + selectPay.options[index].text + "\n" +
                    'Efectivo a devolver: ' + cashBack() + '\n' +
                    '\n' + '¿Estás seguro de comprar estos artículos?'); 
        if(option == true){
            print();
        }
    }else{
        window.alert('Seleccione una forma de pago');
    }
}
/* function printForm(){
    if(selectPay.value == "T"){
        option = confirm('Los artículos de mi carrito son: ' + allArticles.value +"\n" +
                    'El precio total es: ' + totalPrice.value + ' €' + '\n' +
                    'Forma de pago: Tarjeta' + "\n" +
                    '¿Estás seguro de comprar estos artículos?'); 
        if(option == true){
            print();
        }
    }else if(selectPay.value == "E"){
        option = confirm('Los artículos de mi carrito son: ' + allArticles.value +"\n" +
                    'El precio total es: ' + totalPrice.value + ' €' + '\n' +
                    'Forma de pago: Efectivo'  + "\n" +
                    'Efectivo a devolver: ' + cashBack() + '\n' +
                    '¿Estás seguro de comprar estos artículos?');
        if(option == true){
            print();            
         }
    }else{
        alert('Seleccione una forma de pago');
    }
} */


// Recarga la página al pulsar el botón "Restablecer".
function eraseForm() {
    location.reload();
}

// Inicializa las variables.
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
    cashDelivered = document.getElementById('cashDelivered');
    totalAmount = document.getElementById('cashAmount');
    check = document.getElementById('terms');
    erase = document.getElementById('reset');
    printing = document.getElementById('print');
};

// Inicializa los listeners.
function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    printing.addEventListener("click", printForm);
    check.addEventListener('change', ablePrint);
    selectPay.addEventListener("change", showPay);
};

// Carga la ventana y llama a las funciones para inicializar las variables y los listeners.
window.addEventListener("load",() =>{ 
    initVariables();
    initListeners();
    printing.disabled = true; // Al cargar la ventana deshabilita por defecto el botón "Imprimir".
    cardPay.style.display = "none"; // Al cargar la ventana oculta las formas de pago del formulario.
    cashPay.style.display = "none";
});