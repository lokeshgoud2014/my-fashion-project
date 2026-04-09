let products=[];
let id=1;
let cart=[];
let orders=[];

/* GENERATE PRODUCTS */
["Men","Women","Kids"].forEach(cat=>{
  for(let i=1;i<=20;i++){
    products.push({
      id:id++,
      name:cat+" Dress "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
      sizes:["S","M","L","XL"],
      colors:["red","blue","black","green"],
      image:`https://picsum.photos/300?random=${id}`
    });
  }
});

/* CATEGORY */
function openCategory(cat){
  let el=document.getElementById("products");

  let data=products.filter(p=>p.category===cat);

  el.innerHTML=data.map(p=>`
    <div class="card">
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>

      <p>Size:
        <select>
          ${p.sizes.map(s=>`<option>${s}</option>`).join("")}
        </select>
      </p>

      <p>Colors:</p>
      <div class="colors">
        ${p.colors.map(c=>`<span style="background:${c}"></span>`).join("")}
      </div>

      <button onclick="addCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

/* CART */
function addCart(id){
  cart.push(products.find(p=>p.id===id));
  document.getElementById("count").innerText=cart.length;
  showCart();
}

function showCart(){
  let el=document.getElementById("cart");
  el.classList.remove("hide");

  let total=cart.reduce((s,i)=>s+i.price,0);

  el.innerHTML="<h3>Cart</h3>"+
  cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join("")+
  `<h4>Total ₹${total}</h4>
   <button onclick="goCheckout()">Checkout</button>`;
}

/* CHECKOUT */
function goCheckout(){
  document.getElementById("checkout").classList.remove("hide");
}

/* ORDER */
function placeOrder(){
  let total=cart.reduce((s,i)=>s+i.price,0);

  orders.push({
    total:total,
    date:new Date().toLocaleString()
  });

  cart=[];
  document.getElementById("count").innerText=0;

  document.getElementById("success").classList.remove("hide");
  showOrders();
}

/* ORDER HISTORY */
function showOrders(){
  let el=document.getElementById("orders");
  el.classList.remove("hide");

  el.innerHTML="<h3>Order History</h3>"+
  orders.map(o=>`<p>${o.date} - ₹${o.total}</p>`).join("");
}
