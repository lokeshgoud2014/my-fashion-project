let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wish")) || [];

function recommend(){
  let occ = document.getElementById("occasion").value;
  let wea = document.getElementById("weather").value;
  let sty = document.getElementById("style").value;

  let result = [];

  // Logic-based recommendations
  if(occ==="Party" && sty==="Trendy"){
    result = ["Printed Shirt","Slim Jeans","Sneakers"];
  }
  else if(occ==="College"){
    result = ["Tshirt","Jeans","Shoes"];
  }
  else if(occ==="Wedding"){
    result = ["Traditional Wear","Kurta","Sandals"];
  }

  if(wea==="Winter"){
    result.push("Jacket");
  }

  display(result);
}

function display(items){
  let r = document.getElementById("results");
  r.innerHTML="";

  items.forEach((x,i)=>{
    r.innerHTML+=`
    <div class="product">
      <img src="https://picsum.photos/200?random=${i}">
      <p>${x}</p>
      <button onclick="addCart('${x}')">Add to Bag</button>
      <button onclick="addWish('${x}')">❤️</button>
    </div>`;
  });
}

function addCart(item){
  cart.push(item);
  save();
  alert("Added to Bag");
}

function addWish(item){
  wishlist.push(item);
  save();
  alert("Added to Wishlist");
}

function showCart(){
  let c=document.getElementById("cartBox");
  c.style.display="block";
  c.innerHTML="<h3>Cart</h3>";

  cart.forEach(x=>{
    c.innerHTML+=`<p>${x}</p>`;
  });

  c.innerHTML+=`<button onclick="placeOrder()">Place Order</button>`;
}

function showWishlist(){
  let w=document.getElementById("wishlistBox");
  w.style.display="block";
  w.innerHTML="<h3>Wishlist</h3>";

  wishlist.forEach(x=>{
    w.innerHTML+=`<p>${x}</p>`;
  });
}

function placeOrder(){
  alert("Order placed 🎉");
  cart=[];
  save();
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
  localStorage.setItem("wish",JSON.stringify(wishlist));
}
