let sub = {
  men:["Shirts","Jeans","Tshirts"],
  women:["Kurtis","Tops","Sarees"],
  kids:["Sets","Tshirts"]
};

let images = [
 "https://picsum.photos/id/1011/800/300",
 "https://picsum.photos/id/1015/800/300",
 "https://picsum.photos/id/1016/800/300"
];

// slider
let i=0;
setInterval(()=>{
  i=(i+1)%images.length;
  document.getElementById("slide").src=images[i];
},3000);

let products=[];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wish")) || [];

function openCategory(cat){
  let s = document.getElementById("subcategories");
  s.innerHTML="";
  sub[cat].forEach(x=>{
    s.innerHTML += `<div onclick="loadProducts('${x}')">${x}</div>`;
  });
}

function loadProducts(type){
  let p = document.getElementById("products");
  p.className="products";
  p.innerHTML="";
  products=[];

  for(let i=1;i<=10;i++){
    products.push({
      name:type+" "+i,
      price:500+i*20,
      img:`https://picsum.photos/200?random=${i+Math.random()}`
    });
  }

  display(products);
}

// display
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

      <button onclick="addCart(${i})">Add to Bag</button>
      <button onclick="addWish(${i})">❤️ Wishlist</button>
    </div>`;
  });
}

// filters
document.getElementById("search").oninput = function(){
  let val=this.value.toLowerCase();
  display(products.filter(p=>p.name.toLowerCase().includes(val)));
};

document.getElementById("priceFilter").onchange = function(){
  let val=this.value;
  let filtered=products;

  if(val==="low") filtered=products.filter(p=>p.price<700);
  if(val==="high") filtered=products.filter(p=>p.price>700);

  display(filtered);
};

function addCart(i){
  let size=document.getElementById("size"+i).value;
  let color=document.getElementById("color"+i).value;

  cart.push({...products[i],size,color});
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
  cart.forEach(x=>{
    total+=x.price;
    c.innerHTML+=`<p>${x.name}</p>`;
  });

  c.innerHTML+=`<h4>Total ₹${total}</h4>`;
  c.innerHTML+=`<button onclick="placeOrder()">Place Order</button>`;
}

function showWishlist(){
  let w=document.getElementById("wishlistBox");
  w.style.display="block";
  w.innerHTML="<h3>Wishlist</h3>";

  wishlist.forEach(x=>{
    w.innerHTML+=`<p>${x.name}</p>`;
  });
}

function placeOrder(){
  alert("Order placed 🎉");
  cart=[];
  save();
}

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wish", JSON.stringify(wishlist));
}
