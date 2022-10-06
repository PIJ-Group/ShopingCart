let cart = [];
let total = [];
let article;
let price;
let units
let add;
let allArticles;
let totalPrice;
let errorName;
let errorArticle;
let erase;
let nameT = /^\D+$/;
let priceT = /^\d+$/;









function addProduct() {
    if(nameT.test(article.value)){
        cart = cart.concat(article.value);
        showAllArticles();
        article.value = "";
        price.value = "";
        units.value = 1;
    }else{
        errorName.textContent = 'Debes poner un nombre de artículo válido';
    }
}

function showAllArticles() {
    allArticles.value = cart.join(", ");
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
    /* add.addEventListener('click',showAllArticles);  */
    erase.addEventListener('click',eraseForm);
    
};




window.addEventListener("load",() =>{
    initVariables();
    initListeners();
});