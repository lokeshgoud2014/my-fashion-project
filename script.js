let products=[], id=1;
let cart=[], wishlist=[], orders=[];
let selectedProduct=null;

/* GENERATE PRODUCTS */
["Men","Women","Kids"].forEach(cat=>{
  for(let i=1;i<=20;i++){
    products.push({
      id:id++,
      name:cat+" Style "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
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
      <img src="${p.image}" onclick="showDetails(${p.id})">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <button onclick="toggleWishlist(${p.id})">
        ${wishlist.find(i=>i.id===p.id)?"❤️":"🤍"}
      </button>
      <button onclick="addCart(${p.id})">🛒</button>
    </div>
  `).join("");
}

/* PRODUCT DETAILS */
function showDetails(id){
  let p=products.find(x=>x.id===id);
  selectedProduct=p;

  let el=document.getElementById("details");
  el.classList.remove("hide");

  el.innerHTML=`
    <h3>${p.name}</h3>
    <img src="${p.image}" width="200">
    <p>₹${p.price}</p>

    <p>Colors:</p>
    <div class="colors">
      ${p.colors.map(c=>`<span style="background:${c}"></span>`).join("")}
    </div>

    <button onclick="addCart(${p.id})">Add to Cart</button>
    <button onclick="closeDetails()">Close</button>
  `;
}

function closeDetails(){
  document.getElementById("details").classList.add("hide");
}

/* CART */
function addCart(id){
  cart.push(products.find(p=>p.id===id));
  document.getElementById("count").innerText=cart.length;
}

/* WISHLIST */
function toggleWishlist(id){
  let exists=wishlist.find(i=>i.id===id);
  if(exists){
    wishlist=wishlist.filter(i=>i.id!==id);
  }else{
    wishlist.push(products.find(p=>p.id===id));
  }
}

/* SHOW WISHLIST */
function toggleWishlist(){
  let el=document.getElementById("wishlistBox");
  el.classList.toggle("hide");

  el.innerHTML="<h4>Wishlist</h4>"+
    wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

/* SHOW CART */
function toggleCart(){
  let el=document.getElementById("cartBox");
  el.classList.toggle("hide");

  let total=cart.reduce((s,i)=>s+i.price,0);

  el.innerHTML="<h4>Cart</h4>"+
    cart.map(i=>`<p>${i.name}</p>`).join("")+
    `<p>Total ₹${total}</p>
     <button onclick="placeOrder()">Order</button>`;
}

/* PROFILE */
function toggleProfile(){
  document.getElementById("profileBox").classList.toggle("hide");
}

/* ORDER */
function placeOrder(){
  orders.push({
    items:[...cart],
    total:cart.reduce((s,i)=>s+i.price,0),
    date:new Date().toLocaleString()
  });

  cart=[];
  document.getElementById("count").innerText=0;
  alert("Order Placed!");
}

/* ORDER HISTORY */
function showOrders(){
  let el=document.getElementById("orders");
  el.classList.remove("hide");

  el.innerHTML="<h3>Orders</h3>"+
    orders.map(o=>`
      <p>${o.date} - ₹${o.total}</p>
    `).join("");
}
