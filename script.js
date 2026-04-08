let categories = ["Men","Women","Kids"];
let products = [];
let id = 1;

/* 🔥 30 products per category */
categories.forEach(cat=>{
  for(let i=1;i<=30;i++){
    products.push({
      id:id++,
      name:cat+" Fashion "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
      sizes:["S","M","L","XL"],
      colors:["Red","Blue","Black","White"],
      rating:(Math.random()*5).toFixed(1),
      image:`https://source.unsplash.com/300x300/?${cat},fashion`
    });
  }
});

let cart=[], wishlist=[], orders=[];
let current="All";

function setCategory(c){
  current=c;
  renderProducts();
}

function renderProducts(){
  let el=document.getElementById("products");
  let search=document.getElementById("search").value.toLowerCase();

  let data=products.filter(p=>
    (current==="All"||p.category===current)&&
    p.name.toLowerCase().includes(search)
  );

  el.innerHTML=data.map(p=>`
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <p>Sizes: ${p.sizes.join(",")}</p>
      <p>Colors: ${p.colors.join(",")}</p>
      <button onclick="addCart(${p.id})">🛒 Cart</button>
      <button onclick="toggleWishlist(${p.id})">
        ${wishlist.find(i=>i.id===p.id)?"❤️":"🤍"}
      </button>
    </div>
  `).join("");
}

function addCart(id){
  cart.push(products.find(p=>p.id===id));
  document.getElementById("count").innerText=cart.length;
  renderCart();
}

function renderCart(){
  let el=document.getElementById("cart");
  let total=cart.reduce((s,i)=>s+i.price,0);

  el.innerHTML="<h3>Cart</h3>"+
  cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join("")+
  `<h4>Total ₹${total}</h4>`;
}

function toggleWishlist(id){
  let exists=wishlist.find(i=>i.id===id);
  if(exists){
    wishlist=wishlist.filter(i=>i.id!==id);
  }else{
    wishlist.push(products.find(p=>p.id===id));
  }
  renderWishlist();
  renderProducts();
}

function renderWishlist(){
  let el=document.getElementById("wishlist");
  el.innerHTML="<h3>Wishlist</h3>"+
  wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

function placeOrder(e){
  e.preventDefault();

  orders.push({
    total:cart.reduce((s,i)=>s+i.price,0),
    date:new Date().toLocaleString()
  });

  cart=[];
  document.getElementById("count").innerText=0;
  renderCart();
  renderOrders();

  document.getElementById("msg").innerText="✅ Order Placed!";
}

function renderOrders(){
  let el=document.getElementById("orders");
  el.innerHTML="<h3>Orders</h3>"+
  orders.map(o=>`<p>${o.date} - ₹${o.total}</p>`).join("");
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView();
}

renderProducts();
renderCart();
renderWishlist();
renderOrders();
