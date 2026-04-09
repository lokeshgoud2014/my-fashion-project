let sub={
  men:["Shirts","Jeans","Tshirts"],
  women:["Kurtis","Tops"],
  kids:["Sets","Tshirts"]
};

let images=[
 "https://picsum.photos/id/1011/800/300",
 "https://picsum.photos/id/1015/800/300",
 "https://picsum.photos/id/1016/800/300"
];

let i=0;
setInterval(()=>{
  i=(i+1)%images.length;
  document.getElementById("slide").src=images[i];
},3000);

let products=[];
let cart=JSON.parse(localStorage.getItem("cart"))||[];
let wishlist=JSON.parse(localStorage.getItem("wish"))||[];
let orders=JSON.parse(localStorage.getItem("orders"))||[];

function openCategory(cat){
  let s=document.getElementById("subcategories");
  s.innerHTML="";
  sub[cat].forEach(x=>{
    s.innerHTML+=`<div onclick="loadProducts('${x}')">${x}</div>`;
  });
}

function loadProducts(type){
  let p=document.getElementById("products");
  p.className="products";
  p.innerHTML="";
  products=[];

  for(let i=1;i<=10;i++){
    products.push({
      name:type+i,
      price:500+i*20,
      img:`https://picsum.photos/200?random=${i+Math.random()}`
    });
  }

  display(products);
}

function display(list){
  let p=document.getElementById("products");
  p.innerHTML="";

  list.forEach((x,i)=>{
    p.innerHTML+=`
    <div class="product">
      <img src="${x.img}">
      <p>${x.name}</p>
      <p>₹${x.price}</p>

      <select id="size${i}">
        <option>S</option><option>M</option><option>L</option>
      </select>

      <select id="color${i}">
        <option>Red</option><option>Black</option>
      </select>

      <button onclick="addCart(${i})">Add</button>
      <button onclick="addWish(${i})">❤️</button>
    </div>`;
  });
}

search.oninput=()=>{
  display(products.filter(p=>p.name.toLowerCase().includes(search.value.toLowerCase())));
};

priceFilter.onchange=()=>{
  let val=priceFilter.value;
  let f=products;

  if(val==="low") f=products.filter(p=>p.price<700);
  if(val==="high") f=products.filter(p=>p.price>700);

  display(f);
};

function addCart(i){
  cart.push(products[i]);
  save();
  alert("Added to Bag");
}

function addWish(i){
  wishlist.push(products[i]);
  save();
  alert("Added to Wishlist");
}

function showCart(){
  let c=document.getElementById("cartBox");
  c.style.display="block";
  c.innerHTML="<h3>Bag</h3>";

  let total=0;
  cart.forEach((x,idx)=>{
    total+=x.price;
    c.innerHTML+=`<p>${x.name} <button onclick="removeCart(${idx})">❌</button></p>`;
  });

  c.innerHTML+=`<h4>Total ₹${total}</h4>`;
  c.innerHTML+=`<button onclick="placeOrder()">Place Order</button>`;
}

function removeCart(i){
  cart.splice(i,1);
  save();
  showCart();
}

function showWishlist(){
  let w=document.getElementById("wishlistBox");
  w.style.display="block";
  w.innerHTML="<h3>Wishlist</h3>";

  wishlist.forEach((x,idx)=>{
    w.innerHTML+=`<p>${x.name} <button onclick="moveToCart(${idx})">Move</button></p>`;
  });
}

function moveToCart(i){
  cart.push(wishlist[i]);
  wishlist.splice(i,1);
  save();
  showWishlist();
}

function placeOrder(){
  orders.push(...cart);
  cart=[];
  save();
  alert("Order placed 🎉");
}

function showAccount(){
  document.getElementById("accountBox").style.display="block";
  renderOrders();
}

function renderOrders(){
  let o=document.getElementById("orders");
  o.innerHTML="";
  orders.forEach(x=>o.innerHTML+=`<li>${x.name}</li>`);
}

function saveUser(){
  localStorage.setItem("user",username.value);
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("wish",JSON.stringify(wishlist));
  localStorage.setItem("orders",JSON.stringify(orders));
}

function goHome(){
  location.reload();
}
