let sub = {
  men:["Traditional","Party","Tshirts","Shirts","Jeans"],
  women:["Sarees","Kurtis","Tops","Jeans"],
  kids:["Frocks","Tshirts","Sets"]
};

let products=[];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wish")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function openCategory(cat){
  let s = document.getElementById("subcategories");
  s.innerHTML="";
  sub[cat].forEach(x=>{
    s.innerHTML += `<div onclick="loadProducts('${x}')">${x}</div>`;
  });
}

function loadProducts(type){
  let p = document.getElementById("products");
  p.innerHTML="";
  products=[];

  for(let i=1;i<=10;i++){
    products.push({
      name:type+" "+i,
      price:500+i*10,
      img:`https://source.unsplash.com/200x200/?${type}`
    });
  }

  products.forEach((x,i)=>{
    p.innerHTML += `
    <div class="product">
      <img src="${x.img}">
      <p>${x.name}</p>
      <p>₹${x.price}</p>

      <select id="size${i}">
        <option>S</option><option>M</option><option>L</option>
      </select>

      <select id="color${i}">
        <option>Red</option><option>Black</option><option>Blue</option>
      </select>

      <button onclick="addCart(${i})">Add to Bag</button>
      <button onclick="addWish(${i})">❤️</button>
    </div>`;
  });
}

function addCart(i){
  let size = document.getElementById("size"+i).value;
  let color = document.getElementById("color"+i).value;

  cart.push({...products[i], size, color});
  save();
  alert("Added to Bag");
}

function addWish(i){
  wishlist.push(products[i]);
  save();
  alert("Added to Wishlist");
}

function showCart(){
  let c = document.getElementById("cartBox");
  c.style.display="block";
  c.innerHTML="<h3>Bag</h3>";

  let total=0;

  cart.forEach((x,index)=>{
    total+=x.price;
    c.innerHTML+=`<p>${x.name} (${x.size}, ${x.color})</p>`;
  });

  c.innerHTML+=`<h4>Total ₹${total}</h4>`;
  c.innerHTML+=`<button onclick="placeOrder()">Place Order</button>`;
}

function showWishlist(){
  let w = document.getElementById("wishlistBox");
  w.style.display="block";
  w.innerHTML="<h3>Wishlist</h3>";

  wishlist.forEach(x=>{
    w.innerHTML+=`<p>${x.name}</p>`;
  });
}

function placeOrder(){
  orders.push(...cart);
  cart=[];
  save();
  alert("Order Placed Successfully 🎉");
}

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wish", JSON.stringify(wishlist));
  localStorage.setItem("orders", JSON.stringify(orders));
}
