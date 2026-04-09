let products=[];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wish")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function loadCategory(type){
  let p=document.getElementById("products");
  p.innerHTML="";
  products=[];

  for(let i=1;i<=20;i++){
    products.push({
      name:type+" Dress "+i,
      price:500+i*15,
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
        <option>Red</option><option>Black</option><option>Blue</option>
      </select>

      <button onclick="addCart(${i})">Add to Cart</button>
      <button onclick="addWish(${i})">❤️ Wishlist</button>
    </div>`;
  });
}

function addCart(i){
  let size=document.getElementById("size"+i).value;
  let color=document.getElementById("color"+i).value;

  cart.push({...products[i], size, color});
  save();
  alert("Added to Cart");
}

function addWish(i){
  wishlist.push(products[i]);
  save();
  alert("Added to Wishlist");
}

function showCart(){
  let c=document.getElementById("cartBox");
  c.style.display="block";
  c.innerHTML="<h3>Cart</h3>";

  let total=0;

  cart.forEach((x,idx)=>{
    total+=x.price;
    c.innerHTML+=`<p>${x.name} (${x.size},${x.color})
    <button onclick="removeCart(${idx})">❌</button></p>`;
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
    w.innerHTML+=`<p>${x.name}
    <button onclick="moveToCart(${idx})">Move</button></p>`;
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

function save(){
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wish", JSON.stringify(wishlist));
  localStorage.setItem("orders", JSON.stringify(orders));
}
