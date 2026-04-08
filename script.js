let products = [
  {id:1,name:"Men Shirt",collection:"Men",price:999,image:"https://via.placeholder.com/200"},
  {id:2,name:"Women Dress",collection:"Women",price:1499,image:"https://via.placeholder.com/200"},
  {id:3,name:"Kids Wear",collection:"Kids",price:799,image:"https://via.placeholder.com/200"}
];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentFilter = "All";

function saveData(){
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  localStorage.setItem("cart", JSON.stringify(cart));
}

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

  container.innerHTML = filtered.map(p=>{
    const liked = wishlist.find(i=>i.id===p.id);
    return `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <span class="heart" onclick="toggleWishlist(${p.id})">
          ${liked ? "❤️" : "🤍"}
        </span>
        <br>
        <button onclick="addCart(${p.id})">Add to Cart</button>
      </div>
    `;
  }).join("");
}

function toggleWishlist(id){
  const exists = wishlist.find(i=>i.id===id);
  if(exists){
    wishlist = wishlist.filter(i=>i.id!==id);
  } else {
    wishlist.push(products.find(p=>p.id===id));
  }
  saveData();
  renderWishlist();
  renderProducts();
}

function renderWishlist(){
  const el = document.getElementById("wishlist");
  el.innerHTML = "<h3>Wishlist</h3>" +
    wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

function addCart(id){
  const p = products.find(x=>x.id===id);
  cart.push(p);
  saveData();
  renderCart();
}

function renderCart(){
  const el = document.getElementById("cart");
  let total = cart.reduce((sum,i)=>sum+i.price,0);

  document.getElementById("cartCount").innerText = cart.length;

  el.innerHTML = "<h3>Cart</h3>" +
    cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join("") +
    `<h4>Total: ₹${total}</h4>`;
}

function showSection(id){
  document.getElementById(id).scrollIntoView();
}

renderProducts();
renderWishlist();
renderCart();
 
  
