let products=[];
let id=1;

/* REAL IMAGE CATEGORY BASE */
["Men","Women","Kids"].forEach(cat=>{
  for(let i=1;i<=20;i++){
    let img =
      cat==="Men"
      ? `https://source.unsplash.com/300x300/?men,shirt&sig=${id}`
      : cat==="Women"
      ? `https://source.unsplash.com/300x300/?women,dress&sig=${id}`
      : `https://source.unsplash.com/300x300/?kids,clothes&sig=${id}`;

    products.push({
      id:id++,
      name:cat+" Style "+i,
      category:cat,
      price:Math.floor(Math.random()*2000)+500,
      reviews:["Nice product"],
      image:img
    });
  }
});

let cart=[], wishlist=[], orders=[];
let current="All";

/* SLIDER */
let slides=document.querySelectorAll(".slider img");
let index=0;
setInterval(()=>{
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
  index=(index+1)%slides.length;
},10000);

/* CATEGORY */
function openCategory(cat){
  current=cat;
  renderProducts();
}

/* PRODUCTS */
function renderProducts(){
  let el=document.getElementById("products");

  let data=products.filter(p=>current==="All"||p.category===current);

  el.innerHTML=data.map(p=>`
    <div class="card">
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>

      <button onclick="addCart(${p.id})">🛒</button>
      <button onclick="toggleWishlist(${p.id})">
        ${wishlist.find(i=>i.id===p.id)?"❤️":"🤍"}
      </button>

      <h5>Reviews</h5>
      ${p.reviews.map(r=>`<p>${r}</p>`).join("")}

      <input id="rev${p.id}" placeholder="Add review">
      <button onclick="addReview(${p.id})">Submit</button>
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
  cart.map(i=>`<p>${i.name}</p>`).join("")+
  `<h4>Total ₹${total}</h4>`;
}

/* WISHLIST */
function toggleWishlist(id){
  let exists=wishlist.find(i=>i.id===id);
  if(exists){
    wishlist=wishlist.filter(i=>i.id!==id);
  }else{
    wishlist.push(products.find(p=>p.id===id));
  }
  showWishlist();
  renderProducts();
}

function showWishlist(){
  let el=document.getElementById("wishlist");
  el.classList.remove("hide");

  el.innerHTML="<h3>Wishlist</h3>"+
  wishlist.map(i=>`<p>${i.name}</p>`).join("");
}

/* REVIEWS */
function addReview(id){
  let text=document.getElementById("rev"+id).value;
  let p=products.find(x=>x.id===id);
  p.reviews.push(text);
  renderProducts();
}

/* PROFILE */
function toggleProfile(){
  document.getElementById("profileMenu").classList.toggle("hide");
}

/* ORDERS */
function showOrders(){
  let el=document.getElementById("orders");
  el.classList.remove("hide");

  el.innerHTML="<h3>Orders</h3>"+
  orders.map(o=>`<p>₹${o.total}</p>`).join("");
}

/* INIT */
renderProducts();
