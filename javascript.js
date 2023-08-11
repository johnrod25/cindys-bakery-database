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

function validateSignup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;  
    if (password == password2) {
        window.location.href = "login.html?username="+username+"&password="+password;
        alert("Sign Up Successful! Please Login.");
    }
    document.getElementById('sign-status').innerHTML = "Password do not match!";
    return false;
}

function validateLogin() {
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    const password = urlParams.get('password');
    if (loginUsername==username && loginPassword==password) {
        window.location.href = "index.html";
        alert("Login Successful!");
        return false;
    }
    document.getElementById("log-status").innerHTML = "Incorrect username or password";
    return false;
}