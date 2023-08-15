document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
const removebtn=document.querySelectorAll(".gg-trash")
removebtn.forEach(element => {
    element.addEventListener('click',removecart)
});
const addbtn=document.querySelectorAll(".add-cart");
addbtn.forEach(add=>{
    add.addEventListener('click',addCart);
});
const quantity=document.querySelectorAll(".quantity");
quantity.forEach(qq=>{
    qq.addEventListener('change',qtnchange);
});

UpdateTotal();
}
//.pop-close
const cartclose = document.querySelector(".close");
const cartElement = document.querySelector(".cart");
const cartopen = document.querySelector(".cart-div i");
cartopen.addEventListener('click', () => {
    cartElement.classList.add("cart-active");
});
cartclose.addEventListener('click', () => {
    cartElement.classList.remove("cart-active");
});

function qtnchange() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
      }
      loadContent();
}
let listItems=[];
function addCart() {
    console.log('print');
    let food = this.parentElement;
    let Title = food.querySelector('.card-titl').innerHTML;
        let Rate = food.querySelector('.card-price').innerHTML;
        let ImgSrc = food.querySelector('.img-order').src;
NewProdAlready={Title,Rate,ImgSrc};
if(listItems.find((li)=>li.Title===NewProdAlready.Title)){
    alert('Already')
    return;
}
else{
    listItems.push(NewProdAlready);
}
        let NewCart = NewProduct(Title, Rate, ImgSrc);
        let divforcart = document.createElement("div");
        divforcart.innerHTML = NewCart;
        let adding = document.querySelector('.cart-content');
        adding.append(divforcart);
        loadContent();
    }
function NewProduct(Title,Rate,ImgSrc) {
         return ` <div class="cart-box">
         <img src="${ImgSrc}" class="img-cart" alt="">
         <div class="cart-details">
           <div class="cart-titl">${Title}</div>
           <div class="cart-amount">
             <div class="cart-price">
                  ${Rate}
             </div>
             <div class="cart-rate">
             ${Rate}
             </div>
           </div>
           <input type="number" class="quantity" value="1">
         </div>
         <i class="gg-trash"></i>
       </div>`;    
}

function removecart() {
    let title = this.parentElement.querySelector('.cart-titl').innerHTML; 
    listItems = listItems.filter(li => li.Title !== title);
 // listItems=listItems.filter(fil=>fil.Title!==title);
    this.parentElement.remove();
   loadContent();
}
function UpdateTotal() {
    const totalrs=document.querySelector(".total-rs"); 
    const cardItems = document.querySelectorAll(".cart-box"); 
    let total = 0;
    cardItems.forEach(prod => { 
    let cartamt = prod.querySelector(".cart-price"); 
    let price = parseFloat(cartamt.innerText.replace("Rs.", "")); // Change this line
    let qty = prod.querySelector(".quantity").value;
    total += (price * qty);
      prod.querySelector(".cart-rate").innerText = "Rs." + (price * qty);
 }); // Update the display within the loop
    totalrs.innerHTML = "Total Rs." + total;

if(listItems.length!==0){

    const popclose=document.querySelector(".pop-close");
    const popup=document.querySelector(".pop-up");
    const popopen=document.querySelector(".place-order");
    popopen.addEventListener('click',popfunctionopen);
    popclose.addEventListener('click',popfunctionclose);
    function popfunctionopen() {
        popup.classList.add("pop-main");
     }
     function popfunctionclose() {
         popup.classList.remove("pop-main");
     }
     popclose.addEventListener('click', () => {
        cartElement.classList.remove("cart-active");
    });
}
}