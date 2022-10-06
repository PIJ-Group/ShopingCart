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
let nameT = /^\D+$/;
let priceT = /^\d+$/;









function addProduct() {
    if(nameT.test(article.value)){
        cart = cart.concat(article.value);
        showAllArticles();
        
    }else{
        errorName.textContent = 'Debes poner un nombre de artículo válido';
    }
}

function add123() {
    parseFloat(total); total = (price.value * units.value) + totalPrice.value;
    showTotalPrice();
    article.value = "";
        price.value = 0;
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
     add.addEventListener('click',add123);  
    erase.addEventListener('click',eraseForm);

    
};




window.addEventListener("load",() =>{
    initVariables();
    initListeners();
});