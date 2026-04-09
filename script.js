let products=[], id=1;
let cart=[], wishlist=[], orders=[];
let selectedProduct=null;
let selectedColor="";
let priceFilter="All";

/* PRODUCTS */
["Men","Women","Kids"].forEach(cat=>{
  for(let i=1;i<=20;i++){
    products.push({
      id:id++,
      name:cat+" Style "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
      colors:["red","blue","black","green"],
      image:`https://source.unsplash.com/300x300/?${cat},fashion&sig=${id}`
    });
  }
});

/* CATEGORY */
function openCategory(cat){
  renderProducts(cat);
}

/* RENDER */
function renderProducts(cat="All"){
  let el=document.getElementById("products");

  let data=products.filter(p=>
    (cat==="All"||p.category===cat) &&
    (priceFilter==="All"||p.price<=priceFilter)
  );

  el.innerHTML=data.map(p=>`
    <div class="card">
      <img src="${p.image}" onclick="showDetails(${p.id})">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <p>${"⭐".repeat(Math.floor(Math.random()*5)+1)}</p>

      <button onclick="toggleWishlistItem(${p.id})">
        ${wishlist.find(i=>i.id===p.id)?"❤️":"🤍"}
      </button>

      <button onclick="addCart(${p.id})">🛒</button>
    </div>
  `).join("");
}

/* DETAILS */
function showDetails(id){
  let p=products.find(x=>x.id===id);
  selectedProduct=p;

  let el=document.getElementById("details");
  el.classList.remove("hide");

  el.innerHTML=`
    <h3>${p.name}</h3>
    <img src="${p.image}" width="200">
    <p>₹${p.price}</p>

    <p>Size:</p>
    <select>
      <option>S</option><option>M</option><option>L</option><option>XL</option>
    </select>

    <p>Colors:</p>
    <div class="colors">
      ${p.colors.map(c=>`
        <span onclick="selectColor('${c}')" style="background:${c}"></span>
      `).join("")}
    </div>

    <p id="selectedColor">Selected: None</p>

    <button onclick="addCart(${p.id})">Add to Cart</button>
    <button onclick="closeDetails()">Close</button>
  `;
}

function selectColor(c){
  selectedColor=c;
  document.getElementById("selectedColor").innerText="Selected: "+c;
}

function closeDetails(){
  document.getElementById("details").classList.add("hide");
}

/* CART */
function addCart(id){
  cart.push(products.find(p=>p.id===id));
  document.getElementById("count").innerText=cart.length;
}

document.getElementById("cartIcon").onmouseenter=()=>{
  let el=document.getElementById("cartBox");
  el.classList.remove("hide");

  let total=cart.reduce((s,i)=>s+i.price,0);

  el.innerHTML="<h4>Cart</h4>"+
  cart.map(i=>`<p>${i.name}</p>`).join("")+
  `<p>Total ₹${total}</p>
   <button onclick="openCheckout()">Checkout</button>`;
};

document.getElementById("cartIcon").onmouseleave=()=>{
  document.getElementById("cartBox").classList.add("hide");
};

/* CHECKOUT */
function openCheckout(){
  document.getElementById("checkout").classList.remove("hide");
}

/* WISHLIST */
function toggleWishlistItem(id){
  let exists=wishlist.find(i=>i.id===id);
  if(exists){
    wishlist=wishlist.filter(i=>i.id!==id);
  }else{
    wishlist.push(products.find(p=>p.id===id));
  }
  renderProducts();
}

document.getElementById("wishIcon").onmouseenter=()=>{
  let el=document.getElementById("wishlistBox");
  el.classList.remove("hide");

  el.innerHTML="<h4>Wishlist</h4>"+
    wishlist.map(i=>`<p>${i.name}</p>`).join("");
};

document.getElementById("wishIcon").onmouseleave=()=>{
  document.getElementById("wishlistBox").classList.add("hide");
};

/* PROFILE */
document.getElementById("profileIcon").onmouseenter=()=>{
  document.getElementById("profileBox").classList.remove("hide");
};
document.getElementById("profileBox").onmouseleave=()=>{
  document.getElementById("profileBox").classList.add("hide");
};

/* ORDER */
function placeOrder(){
  orders.push({
    items:[...cart],
    total:cart.reduce((s,i)=>s+i.price,0),
    date:new Date().toLocaleString()
  });

  cart=[];
  document.getElementById("count").innerText=0;

  alert("Order Successfully Placed!");
}

/* ORDER HISTORY */
function showOrders(){
  let el=document.getElementById("orders");
  el.classList.remove("hide");

  el.innerHTML="<h3>Order History</h3>"+
    orders.map(o=>`
      <div>
        <p>${o.date}</p>
        <p>₹${o.total}</p>
        ${o.items.map(i=>`<p>- ${i.name}</p>`).join("")}
      </div>
    `).join("");
}

/* FILTER */
function filterPrice(val){
  priceFilter=val;
  renderProducts();
}

/* INIT */
renderProducts();
