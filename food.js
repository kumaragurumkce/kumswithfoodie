

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
  setupCart();
  setupForm();
  
}

function setupCart() {
  const cartclose = document.querySelector(".close");
  const cartElement = document.querySelector(".cart");
  const cartopen = document.querySelector(".cart-div i");

  
  cartopen.addEventListener("click", () => {
    cartElement.classList.add("cart-active");
  });
  
  
  cartclose.addEventListener("click", () => {
    cartElement.classList.remove("cart-active");
  });

  UpdateTotal();

  }

function setupForm() {
  const formEl = document.forms.formIntro;
  console.log(formEl);
  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.fullName) {
        const capitalizedFullName =
          responseData.fullName.charAt(0).toUpperCase() +
          responseData.fullName.slice(1);
        document.querySelector(".response").innerHTML = capitalizedFullName;
      }
     } catch (error) {
      console.error("An error occurred:", error);
    }
    formEl.addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        setupForm();
      }
    });
  
    document.querySelector('.div-form').style.display='none';
    document.querySelector('.div-form').style.transform='translate(-50%,-50%)scale(0.1)';
    setTimeout(function () {
      document.querySelector('.doneSymbol').style.display='none'; 
      document.querySelector('.doneSymbol').style.transform='translate(-50%,-50%)scale(0.1)'; 
    },2000  )
    
  
});

}

function loadContent() {

  const removebtn = document.querySelectorAll(".gg-trash");
  removebtn.forEach((element) => {
    element.addEventListener("click", removecart);
  });

  const addbtn = document.querySelectorAll(".add-cart");
  addbtn.forEach((add) => {
    add.addEventListener("click", addCart);
  });

  const quantity = document.querySelectorAll(".quantity");
  quantity.forEach((qq) => {
    qq.addEventListener("change", qtnchange);
  });
 
  UpdateTotal();
}

function qtnchange() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let listItems = [];

function addCart() {
  let food = this.parentElement;
  let Title = food.querySelector(".card-titl").innerHTML;
  let Rate = food.querySelector(".card-price").innerHTML;
  let ImgSrc = food.querySelector(".img-order").src;

  const NewProdAlready = { Title, Rate, ImgSrc };

  if (listItems.find((li) => li.Title === NewProdAlready.Title)) {
    alert("Already");
    return;
  } else {
    listItems.push(NewProdAlready);
  }

  let NewCart = NewProduct(Title, Rate, ImgSrc);
  let divforcart = document.createElement("div");
  divforcart.innerHTML = NewCart;
  let adding = document.querySelector(".cart-content");
  adding.append(divforcart);
  loadContent();
}

function NewProduct(Title, Rate, ImgSrc) {
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
  let title = this.parentElement.querySelector(".cart-titl").innerHTML;
  listItems = listItems.filter((li) => li.Title !== title);
  this.parentElement.remove();
  loadContent();
}

function UpdateTotal() {
  const totalrs = document.querySelector(".total-rs");
  const cardItems = document.querySelectorAll(".cart-box");
  let total = 0;

  cardItems.forEach((prod) => {
    let cartamt = prod.querySelector(".cart-price");
    let price = parseFloat(cartamt.innerText.replace("Rs.", ""));
    let qty = prod.querySelector(".quantity").value;
    total += price * qty;
    prod.querySelector(".cart-rate").innerText = "Rs." + price * qty;
  });

  totalrs.innerHTML = "Total Rs." + total;

  if (listItems.length !== 0) {
    const popclose = document.querySelector(".pop-close");
    const popup = document.querySelector(".pop-up");
    const popopen = document.querySelector(".btn-order");

    popopen.addEventListener("click", () => {
      popup.classList.add("pop-main");
    });

    popclose.addEventListener("click", () => {
      popup.classList.remove("pop-main");
      cartElement.classList.remove("cart-active");
    });
    
  }
}
