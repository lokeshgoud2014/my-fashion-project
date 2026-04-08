let products=[];
let id=1;

["Men","Women","Kids"].forEach(cat=>{
  for(let i=1;i<=10;i++){
    let img =
      cat==="Men"
      ? "https://source.unsplash.com/400x400/?men,shirt"
      : cat==="Women"
      ? "https://source.unsplash.com/400x400/?women,dress"
      : "https://source.unsplash.com/400x400/?kids,clothes";

    products.push({
      id:id++,
      name:cat+" "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
      sizes:["S","M","L"],
      colors:["Red","Blue","Black"],
      reviews:["Good product"],
      image:img
    });
  }
});

let cart=[];
let orders=[];
let current="All";
let selectedProduct=null;

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
      <button onclick="showDetails(${p.id})">View</button>
    </div>
  `).join("");
}

function showDetails(id){
  let p=products.find(x=>x.id===id);
  selectedProduct=p;

  let el=document.getElementById("details");
  el.style.display="block";

  el.innerHTML=`
    <h3>${p.name}</h3>
    <img src="${p.image}" width="200">

    <p>₹${p.price}</p>

    <p>Size:
      ${p.sizes.map(s=>`<button onclick="selectSize('${s}')">${s}</button>`).join("")}
    </p>

    <p>Color:
      ${p.colors.map(c=>`<button>${c}</button>`).join("")}
    </p>

    <button onclick="addCart()">Add to Cart</button>

    <h4>Reviews</h4>
    ${p.reviews.map(r=>`<p>${r}</p>`).join("")}

    <input id="reviewText" placeholder="Write review">
    <button onclick="addReview()">Submit</button>
  `;
}

function addCart(){
  cart.push(selectedProduct);
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

function addReview(){
  let text=document.getElementById("reviewText").value;
  selectedProduct.reviews.push(text);
  showDetails(selectedProduct.id);
}

function placeOrder(e){
  e.preventDefault();

  orders.push({
    total:cart.reduce((s,i)=>s+i.price,0),
    date:new Date().toLocaleString()
  });

  cart=[];
  renderCart();
  renderOrders();

  document.getElementById("msg").innerText="Order Placed!";
}

function renderOrders(){
  let el=document.getElementById("orders");
  el.innerHTML="<h3>Orders</h3>"+
    orders.map(o=>`<p>${o.date} - ₹${o.total}</p>`).join("");
}

function showSection(id){
  document.getElementById(id).scrollIntoView();
}

renderProducts();
renderCart();
renderOrders();
