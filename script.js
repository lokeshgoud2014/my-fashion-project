let users=[];
let currentUser=null;
let cart=[];
let currentCategory="";

// LOGIN
function login(){
  let u=document.getElementById("user").value;
  let p=document.getElementById("pass").value;

  let found=users.find(x=>x.u===u && x.p===p);
  if(found){
    currentUser=u;
    showPage("homePage");
  }else{
    alert("Invalid login");
  }
}

// SIGNUP
function signup(){
  let u=document.getElementById("newUser").value;
  let p=document.getElementById("newPass").value;

  users.push({u,p});
  alert("Signup success");
  showPage("loginPage");
}

function showSignup(){
  showPage("signupPage");
}

function showPage(id){
  document.querySelectorAll("body > div").forEach(d=>d.classList.add("hide"));
  document.getElementById(id).classList.remove("hide");
}

// CATEGORY
function openCategory(cat){
  currentCategory=cat;
  document.getElementById("catTitle").innerText=cat;
  showPage("productPage");
  loadProducts();
}

// PRODUCTS
function loadProducts(){
  let el=document.getElementById("products");
  let items="";

  for(let i=1;i<=20;i++){
    items+=`
      <div>
        <img src="https://picsum.photos/200?${i}">
        <p>${currentCategory} Dress ${i}</p>
        <p>₹${500+i*10}</p>
        <button onclick="addCart('${currentCategory} ${i}')">Add</button>
      </div>
    `;
  }

  el.innerHTML=items;
}

function addCart(name){
  cart.push(name);
  alert("Added to bag");
}

// ORDER
function placeOrder(){
  showPage("successPage");
}

// BACK
function goBack(){
  showPage("homePage");
}

// INIT
showPage("loginPage");
