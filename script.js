let products = [
  {id:1,name:"Men Shirt",collection:"Men",price:999,colors:["Red","Blue"],sizes:["S","M","L"],reviews:["Good"],image:"https://via.placeholder.com/200"},
  {id:2,name:"Women Dress",collection:"Women",price:1499,colors:["Black","Pink"],sizes:["S","M"],reviews:["Nice"],image:"https://via.placeholder.com/200"},
  {id:3,name:"Kids Wear",collection:"Kids",price:799,colors:["Yellow"],sizes:["XS","S"],reviews:["Cute"],image:"https://via.placeholder.com/200"}
];

let wishlist = JSON.parse(localStorage.getItem("wishlist"))||[];
let cart = JSON.parse(localStorage.getItem("cart"))||[];
let orders = JSON.parse(localStorage.getItem("orders"))||[];

function save(){
  localStorage.setItem("wishlist",JSON.stringify(wishlist));
  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("orders",JSON.stringify(orders));
}

let current="All";

function filterCollection(c){
  current=c;
  renderProducts();
}

function renderProducts(){
  let search=document.getElementById("search").value.toLowerCase();
  let el=document.getElementById("products");

  let filtered=products.filter(p=>
    (current==="All"||p.collection===current)&&
    p.name.toLowerCase().includes(search)
  );

  el.innerHTML=filtered.map(p=>`
  <div class="card">
    <img src="${p.image}" width="100%">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <p>Sizes: ${p.sizes.join(",")}</p>
    <p>Colors: ${p.colors.join(",")}</p>
    <p>⭐ ${p.reviews.join(",")}</p>
    <button onclick="addCart(${p.id})">Add Cart</button>
    <button onclick="addWishlist(${p.id})">❤️</button>
  </div>
  `).join("");
}

function addWishlist(id){
  wishlist.push(products.find(p=>p.id===id));
  save(); renderWishlist();
}

function renderWishlist(){
  let el=document.getElementById("wishlist");
  el.innerHTML="<h3>Wishlist</h3>"+wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

function addCart(id){
  cart.push(products.find(p=>p.id===id));
  save(); renderCart();
}

function renderCart(){
  let el=document.getElementById("cart");
  let total=cart.reduce((s,i)=>s+i.price,0);

  document.getElementById("cartCount").innerText=cart.length;

  el.innerHTML="<h3>Cart</h3>"+
  cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join("")+
  `<h4>Total ₹${total}</h4>`;
}

function placeOrder(e){
  e.preventDefault();

  orders.push({
    name:document.getElementById("name").value,
    total:cart.reduce((s,i)=>s+i.price,0)
  });

  cart=[]; save(); renderCart(); renderOrders();

  document.getElementById("msg").innerText="Order Placed!";
}

function renderOrders(){
  let el=document.getElementById("orders");
  el.innerHTML="<h3>Orders</h3>"+
  orders.map(o=>`<p>${o.name} - ₹${o.total}</p>`).join("");
}

function scrollTo(id){
  document.getElementById(id).scrollIntoView();
}

renderProducts();
renderWishlist();
renderCart();
renderOrders();


 
  
