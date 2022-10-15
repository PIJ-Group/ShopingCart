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

function addArticle() {
    if (article.value != ""){
        cart.push(article.value);
        showAllArticles();
        article.focus();
        article.style.border = 'thin solid black';
    }else{
        errorArticle.textContent = 'falta artículo';
        article.style.border = 'thin solid red';
    }
}

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

function showAllArticles() {
    allArticles.value = cart.join(", ");
}

function showTotalPrice() {   
    totalPrice.value = total.toFixed(2);   
}

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

function cashBack(){
    if(cashDelivered.value < totalPrice.value){
        return 'El efectivo entregado no es suficiente roñoso';
    }else {
        let rounding = (cashDelivered.value - totalPrice.value);
        return rounding.toFixed(2) + ' €';
    }
}

function ablePrint() {
    if(check.checked){
        printing.disabled = false;
    }else{
        printing.disabled = true;
    }
}

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
    cashDelivered = document.getElementById('cashDelivered');
    totalAmount = document.getElementById('cashAmount');
    check = document.getElementById('terms');
    erase = document.getElementById('reset');
    printing = document.getElementById('print');
};

function initListeners() {
    add.addEventListener('click',addProduct);
    erase.addEventListener('click',eraseForm);
    printing.addEventListener("click", printForm);
    check.addEventListener('change', ablePrint);
    selectPay.addEventListener("change", showPay);
};

window.addEventListener("load",() =>{
    initVariables();
    initListeners();
    printing.disabled = true;
});