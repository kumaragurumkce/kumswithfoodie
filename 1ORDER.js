const cartbtn = document.querySelector('.Cartbtn i');
const cartElement = document.querySelector('.cart');
const cartx = document.querySelector('.close-btn i');

cartbtn.addEventListener('click', () => {
  cartElement.classList.add('cart-active');
});

cartx.addEventListener('click', () => {
  cartElement.classList.remove('cart-active');
});

document.addEventListener("DOMContentLoaded", loadFood);

let listItems = [];

function loadFood() {
  loadContent();
}

function loadContent() {
  const itemremove = document.querySelectorAll('.deleted');
  itemremove.forEach((element) => {
    element.addEventListener('click', removedelete);
  });

  const qtnbtn = document.querySelectorAll('.quantity');
  qtnbtn.forEach((input) => {
    input.addEventListener('change', qtnchange);
  });

  const cartbox = document.querySelectorAll('.add-cart');
  cartbox.forEach((bb) => {
    bb.addEventListener('click', addCart);
  });
  UpdateTotal();
}

function addCart() {
  let food = this.parentElement;
  let Title = food.querySelector('.card-title').innerHTML;
  let Price = food.querySelector('.card-rate').innerHTML;
  let imgsrc = food.querySelector('.card-img').src;

  let Newproduct = { Title, Price, imgsrc };
  if (listItems.find((el) => el.Title === Newproduct.Title)) {
    alert("Already");
    return;
  } else {
    listItems.push(Newproduct);
  }

  let Newcart = Newelemnt(Title, Price, imgsrc);
  let ddivforcart = document.createElement("div");
  ddivforcart.innerHTML = Newcart;
  let adding = document.querySelector('.cart-content');
  adding.append(ddivforcart);

  loadContent();
}

function Newelemnt(Title, Price, imgsrc) {
  return `
    <div class="cart-box">
      <img src="${imgsrc}" class="card-img" alt="...">
      <div class="detailed-box">
        <h5 class="card-title">${Title}</h5>
        <div class="cart-price">
          <h6 class="card-rate">${Price}</h6>
          <h5 class="cart-amt">${Price}</h5>
        </div>
        <input type="number" value="1" class="quantity">
      </div>
      <i class="deleted fa fa-trash-o" id="deleted"></i>
    </div>
  `;
}

function removedelete() {
 
    let title = this.parentElement.querySelector('.card-title').innerHTML; // Changed '.cart-food-title' to '.card-title'
    listItems = listItems.filter(el => el.Title !== title);
    this.parentElement.remove();
    loadContent();
  }

function qtnchange() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

function UpdateTotal(){
  const totalrs=document.querySelector(".total-rs");
  const cardItems=document.querySelectorAll(".cart-box");
    let total=0;
   cardItems.forEach(prod => {
      let cartamt=document.querySelector(".cart-amt");
      let price=parseFloat(cartamt.innerHTML.replace("RS.",""));
      
      let qty=prod.querySelector(".quantity").value;
      total+=(price*qty);
      prod.querySelector(".cart-amt").innerHTML="Rs."+(price*qty);
    });
     totalrs.innerHTML="Rs."+total;
}
