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
let cardHolder;
let erase;
let printing;
let check;
let option;
let priceT = /^[+-]?\d+([.]\d+)?$/; 
 
/* Verifica que no hay elementos erróneos a introducir en el carrito, ni campos vacíos
   en ese caso, agrega artículo y precio.*/
function addProduct() {
    if (article.value == '' && price.value == ''){
        errorArticle.textContent = 'falta artículo';
        article.style.border = '2px solid red';
        errorPrice.textContent = 'falta precio';
        price.style.border = '2px solid red';
        article.focus();
    }else if (article.value == '' ){
        errorArticle.textContent = 'falta artículo';
        article.style.border = '2px solid red';
        price.style.border = '2px solid black';
        article.focus();
        errorPrice.textContent  = '';        
    }else if (price.value == ''){
        errorPrice.textContent = 'falta precio';
        price.style.border = '2px solid red';
        article.style.border = '2px solid black';
        price.focus();
        errorArticle.textContent = '';
    }else if (!priceT.test(price.value)){
        errorPrice.textContent = 'tipo de dato incorrecto';
        errorArticle.textContent = '';
        article.style.border = '2px solid black';
        price.style.border = '2px solid red';
        price.focus();
    }else{      
        addArticle();
        addPrices();
        article.style.border = '2px solid #FBB040';
        price.style.border = '2px solid #FBB040';
        article.value = '';
        errorArticle.textContent = '';
        errorPrice.textContent  = '';
        article.focus();
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
    price.value = ''; 
    price.style.border ='2px solid black';
    units.value = 1;
}

// Saca el array de artículos del carrito separados por una ','.
function showAllArticles() {
    allArticles.value = cart.join(', ');
}

// Muestra el precio total del carrito.
function showTotalPrice() {   
    totalPrice.value = total.toFixed(2);   
}

// Muestra u oculta las secciones de formulario según la forma de pago elegida.
function showPay() {
    if(selectPay.value == 'T'){
        cardPay.style.display = 'block'; 
        cashPay.style.display = 'none';
        cardHolder.focus();
    }else if(selectPay.value == 'E'){
        cardPay.style.display = 'none';
        cashPay.style.display = 'block';
        cashDelivered.focus();
        if(totalPrice.value == 0){
            totalAmount.value = 0;
        }else{
            totalAmount.value = totalPrice.value; 
        }
    }else{
        cardPay.style.display = 'none';
        cashPay.style.display = 'none';
    }
}

// Calcula las vueltas del pago en efectivo.
 function cashBack(){
    let cashReturn = Number(cashDelivered.value);
    if(cashReturn < totalPrice.value){
        return 'El efectivo entregado no es suficiente roñoso'; //Jorge: vais a dejar lo del roñoso??? xD
    }else {
        cashReturn -= totalPrice.value;
        return cashReturn.toFixed(2) + ' €';
    }
}

/* Habilita el botón 'Imprimir' cuando se marca el checkbox de las condiciones de compra,
cambiando el color cuando está operativo y volviendo al origen cuando no*/
function ablePrint() {
    if(check.checked){
        printing.disabled = false;
        printing.style.backgroundColor = 'white';
    }else{
        printing.disabled = true;
        printing.style.backgroundColor = 'gray';
    }
}

/* Saca una ventana modal con los datos de la compra, o una alerta
   cuando no se ha seleccionado una forma de pago.*/
function printForm(){
    if(selectPay.value == 'T'){
        option = confirm('Los artículos de mi carrito son: ' + allArticles.value +'\n' +
                    'El precio total es: ' + totalPrice.value + ' €' + '\n' +
                    'Forma de pago: Tarjeta' + '\n' +
                    '¿Estás seguro de comprar estos artículos?'); 
        if(option == true){
            print();
        }
    }else if(selectPay.value == 'E'){
        option = confirm('Los artículos de mi carrito son: ' + allArticles.value + '\n' +
                    'El precio total es: ' + totalPrice.value + ' €' + '\n' +
                    'Forma de pago: Efectivo'  + '\n' +
                    'Efectivo a devolver: ' + cashBack() + '\n' + 
                    '¿Estás seguro de comprar estos artículos?');
        if(option == true){
            print();            
         }
    }else{
        alert('Seleccione una forma de pago');
    }
}

// Recarga la página al pulsar el botón 'Restablecer'.
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
    selectPay = document.getElementById('selectWayToPay');
    cardPay = document.getElementById('cardPay');
    cashPay = document.getElementById('cashPay');
    cashDelivered = document.getElementById('cashDelivered');
    totalAmount = document.getElementById('cashAmount');
    cardHolder = document.getElementById('cardHolder');
    check = document.getElementById('terms');
    erase = document.getElementById('reset');
    printing = document.getElementById('print');
};

// Inicializa los listeners.
function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    printing.addEventListener('click', printForm);
    check.addEventListener('change', ablePrint);
    selectPay.addEventListener('change', showPay);
};

// Carga la ventana y llama a las funciones para inicializar las variables y los listeners.
window.addEventListener('load',() =>{ 
    initVariables();
    initListeners();
    printing.disabled = true; // Al cargar la ventana deshabilita por defecto el botón 'Imprimir'.
    cardPay.style.display = 'none'; // Al cargar la ventana oculta las formas de pago del formulario.
    cashPay.style.display = 'none';
});