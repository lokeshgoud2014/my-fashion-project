const products = [
  {id:1,name:"Men Shirt",collection:"Men",price:999,image:"https://via.placeholder.com/200"},
  {id:2,name:"Women Dress",collection:"Women",price:1499,image:"https://via.placeholder.com/200"},
  {id:3,name:"Kids Wear",collection:"Kids",price:799,image:"https://via.placeholder.com/200"},
];

let wishlist = [];
let cart = [];
let currentFilter = "All";

function filterCollection(type){
  currentFilter = type;
  renderProducts();
}

function renderProducts(){
  const search = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("products");

  const filtered = products.filter(p =>
    (currentFilter==="All" || p.collection===currentFilter) &&
    p.name.toLowerCase().includes(search)
  );

  container.innerHTML = filtered.map(p=>`
    <div class="card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addWishlist(${p.id})">❤️</button>
      <button onclick="addCart(${p.id})">🛒</button>
    </div>
  `).join("");
}

function addWishlist(id){
  const p = products.find(x=>x.id===id);
  wishlist.push(p);
  renderWishlist();
}

function renderWishlist(){
  const el = document.getElementById("wishlist");
  el.innerHTML = "<h3>Wishlist</h3>" +
    wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

function addCart(id){
  const p = products.find(x=>x.id===id);
  cart.push(p);
  renderCart();
}

function renderCart(){
  const el = document.getElementById("cart");
  let total = cart.reduce((sum,i)=>sum+i.price,0);

  el.innerHTML = "<h3>Cart</h3>" +
    cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join("") +
    `<h4>Total: ₹${total}</h4>`;
}

function showSection(id){
  document.getElementById(id).scrollIntoView();
}

renderProducts();
