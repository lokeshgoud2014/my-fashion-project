let products = [
 {id:1,name:"Men Shirt",category:"Men",price:999,colors:["Red","Blue"],sizes:["S","M","L"],image:"https://via.placeholder.com/200"},
 {id:2,name:"Women Dress",category:"Women",price:1499,colors:["Black"],sizes:["S","M"],image:"https://via.placeholder.com/200"},
 {id:3,name:"Kids Wear",category:"Kids",price:799,colors:["Yellow"],sizes:["XS"],image:"https://via.placeholder.com/200"}
];

let cart=[], wishlist=[], orders=[];
let current="All";

function setCategory(c){current=c; renderProducts();}

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
    <p>${p.colors.join(",")}</p>
    <p>${p.sizes.join(",")}</p>
    <button onclick="addCart(${p.id})">Cart</button>
    <button onclick="addWishlist(${p.id})">❤️</button>
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
 cart.map(i=>`<p>${i.name}</p>`).join("")+
 `<h4>Total ₹${total}</h4>`;
}

function addWishlist(id){
 wishlist.push(products.find(p=>p.id===id));
 renderWishlist();
}

function renderWishlist(){
 let el=document.getElementById("wishlist");
 el.innerHTML="<h3>Wishlist</h3>"+
 wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

function placeOrder(e){
 e.preventDefault();
 orders.push({total:cart.reduce((s,i)=>s+i.price,0)});
 cart=[];
 renderCart();
 renderOrders();
 document.getElementById("msg").innerText="Order placed!";
}

function renderOrders(){
 let el=document.getElementById("orders");
 el.innerHTML="<h3>Orders</h3>"+
 orders.map(o=>`<p>₹${o.total}</p>`).join("");
}

function showSection(id){
 document.getElementById(id).scrollIntoView();
}

renderProducts();
