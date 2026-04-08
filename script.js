let currentCategory="";
let cart=[];

/* 🔄 SLIDER */
let slides=document.querySelectorAll(".slider img");
let index=0;

function showSlide(){
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
  index=(index+1)%slides.length;
}
setInterval(showSlide,10000);
showSlide();

/* CATEGORY */
function openCategory(cat){
  currentCategory=cat;
  document.getElementById("catTitle").innerText=cat;
  document.getElementById("productPage").classList.remove("hide");
  loadProducts();
}

/* PRODUCTS */
function loadProducts(){
  let el=document.getElementById("products");
  let html="";

  for(let i=1;i<=20;i++){
    html+=`
    <div class="card">
      <img src="https://picsum.photos/200?random=${i}">
      <h4>${currentCategory} Style ${i}</h4>
      <p>₹${500+i*20}</p>

      <p>Size:
        <select>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </p>

      <p>Color:
        <select>
          <option>Red</option>
          <option>Blue</option>
          <option>Black</option>
        </select>
      </p>

      <button onclick="addCart('${currentCategory} ${i}')">
        Add to Bag
      </button>
    </div>
    `;
  }

  el.innerHTML=html;
}

/* CART */
function addCart(item){
  cart.push(item);
  alert("Added to Bag");
  showCart();
}

function showCart(){
  let el=document.getElementById("cartPage");
  el.classList.remove("hide");

  let html="<h2>Cart</h2>";

  cart.forEach(i=>{
    html+=`<p>${i}</p>`;
  });

  html+=`<button onclick="goCheckout()">Go to Checkout</button>`;

  el.innerHTML=html;
}

/* CHECKOUT */
function goCheckout(){
  document.getElementById("checkoutPage").classList.remove("hide");
}

/* ORDER */
function placeOrder(){
  document.getElementById("successPage").classList.remove("hide");
}
