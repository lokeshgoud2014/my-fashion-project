let sub={
men:["Traditional","Party","Summer","Tshirts","Shirts","Jeans"],
women:["Traditional","Party","Kurtis","Tops","Jeans"],
kids:["Party","Tshirts","Sets"]
};

let products=[];
let wishlist=[];
let cart=[];
let orders=[];

function openCategory(cat){
let s=document.getElementById("subcategories");
s.innerHTML="";
sub[cat].forEach(x=>{
s.innerHTML+=`<div onclick="loadProducts('${x}')">${x}</div>`;
});
}

function loadProducts(type){
let p=document.getElementById("products");
p.innerHTML="";
products=[];

for(let i=1;i<=10;i++){
products.push({name:type+i,price:500+i*10});
}

products.forEach((x,i)=>{
p.innerHTML+=`
<div class='product'>
<p>${x.name}</p>
<p>₹${x.price}</p>

<select id='size${i}'>
<option>S</option><option>M</option><option>L</option>
</select>

<select id='color${i}'>
<option>Red</option><option>Black</option>
</select>

<button onclick='addCart(${i})'>Add</button>
<button onclick='addWish(${i})'>❤️</button>
</div>`;
});
}

function addWish(i){
wishlist.push(products[i]);
renderWishlist();
}

function addCart(i){
cart.push(products[i]);
renderCart();
}

function renderWishlist(){
let w=document.getElementById("wishlistBox");
w.style.display="block";
w.innerHTML="<h3>Wishlist</h3>";
wishlist.forEach(x=>w.innerHTML+=`<p>${x.name}</p>`);
}

function renderCart(){
let c=document.getElementById("cartBox");
c.style.display="block";
c.innerHTML="<h3>Cart</h3>";
cart.forEach(x=>c.innerHTML+=`<p>${x.name}</p>`);
c.innerHTML+="<button onclick='placeOrder()'>Place Order</button>";
}

function placeOrder(){
orders.push(...cart);
cart=[];
alert("Order placed 🎉");
}

function showWishlist(){renderWishlist();}
function showCart(){renderCart();}

function showAccount(){
document.getElementById("accountBox").style.display="block";
renderOrders();
}

function saveUser(){
localStorage.setItem("user",username.value);
}

function renderOrders(){
let o=document.getElementById("orders");
o.innerHTML="";
orders.forEach(x=>o.innerHTML+=`<li>${x.name}</li>`);
}
