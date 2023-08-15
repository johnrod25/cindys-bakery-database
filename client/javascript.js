document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

const cartItem = document.querySelector('.cart-items');
const sideCart = document.querySelector('.side-cart');
const cartItems = [];

function addToCart(name, image, price) {
    cartItems.push({ name, image, price });
    if(sideCart.classList.contains('open'))
    displayCartItems();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    displayCartItems();
}

function displayCartItems() {
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.classList.add('cart-items');
    if(cartItems.length != 0){
        cartItemsContainer.innerHTML = cartItems.map((item, index) => {
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <p>Price: ${item.price}</p>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        }).join('');         
    }else{
        cartItemsContainer.innerHTML = `<p style="text-align: center;">Cart Is Empty.</p>`;
    }
    cartItem.innerHTML = '';
    cartItem.appendChild(cartItemsContainer);
    sideCart.classList.add('open');
}

function hideCart() {
    sideCart.classList.remove('open');
}

const checkout = document.querySelector('#checkout-btn');
checkout.onclick = function () {
    if(cartItems.length != 0){
        cartItems.forEach(item => {
            fetch('http://localhost:5000/checkout', {
            headers: {
            'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name : item.name, price: item.price, image: item.image})
            })
            .then(response => response.json())
            .then(location.reload());
        });
        alert("Order Successful.");
    }else{
        alert("Please Add Items To Your Cart First.");
    }
}

function validateSignup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;  
    if (password == password2) {
        alert("Sign Up Successful! Please Login.");
        fetch('http://localhost:5000/signup', {
            headers: {
            'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ username : username, password: password})
            })
            .then(response => response.json())
            .then(location.href = "login.html");
    }
    document.getElementById('sign-status').innerHTML = "Password do not match!";
    return false;
}

function validateLogin() {
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    fetch('http://localhost:5000/login/' + loginUsername + '&' + loginPassword)
    .then(response => response.json())
    .then(data => {
        if(data['data'].length != 0){
            window.location.href = "index.html";
            alert("Login Successful!");
            return false;
        }
    } );
    document.getElementById("log-status").innerHTML = "Incorrect username or password";
    return false;
}

function loadHTMLTable(data) {
    const div = document.querySelector('#product-lists');
    if (data.length === 0) {
        div.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }
    let divHtml = "";
    data.forEach(function ({name, price, image}) {
    divHtml += `<div class="product-card col-lg-3 col-md-4 col-sm-6">`;
    divHtml += `<img src="${image}" alt="Product 1">`;
    divHtml += `<h3>${name}</h3>`;
    divHtml += `<p>P${price}.00</p>`;
    divHtml += `<button class="add-to-cart-btn" onclick="addToCart('${name}', '${image}', 'P${price}.00')">Add to Cart</button>`;
    divHtml += "</div>";
    });
    div.innerHTML = divHtml;
}