let json;
document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart");

    fetch('/js/shop.json')
        .then((response)=>response.json())
        .then(data => {
            json = data; 
        // Render products
        json.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
        //html and css included
        productElement.innerHTML = ` 
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: UGX ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
    })
    .catch(error => console.error('Error fetching JSON:', error));

    let cart = [];

    // Function to add item to cart
    window.addToCart = function(productId) {
        const product = json.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            renderCart();
        }
        console.log(cart);
    };

    // Function to increase quantity of item in cart
    window.increaseQuantity = function(productId) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity++;
            renderCart();
        }
    };

    // Function to decrease quantity of item in cart
    window.decreaseQuantity = function(productId) {
        const item = cart.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
            renderCart();
        }
    };

    // Function to render cart
    function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        //total = total + item.price
        total += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        // cartItem.textContent = item.name; //doesnt include markup

       // Create image element
       const imageElement = document.createElement("img");
       imageElement.src = item.image;
       imageElement.alt = item.name;
       imageElement.style.maxWidth = "100px";

       const itemName = document.createElement("span");
       itemName.textContent = item.name;

       const quantityControl = document.createElement("div");
       quantityControl.classList.add("quantity-control");

       const decreaseButton = document.createElement("button");
       decreaseButton.textContent = "-";
       decreaseButton.addEventListener("click", function() {
           decreaseQuantity(item.id);
       });

       const quantityDisplay = document.createElement("span");
       quantityDisplay.textContent = item.quantity;

       const increaseButton = document.createElement("button");
       increaseButton.textContent = "+";
       increaseButton.addEventListener("click", function() {
           increaseQuantity(item.id);
       });

       quantityControl.appendChild(decreaseButton);
       quantityControl.appendChild(quantityDisplay);
       quantityControl.appendChild(increaseButton);

       const itemPrice = document.createElement("span");
       itemPrice.textContent = `UGX ${item.price.toLocaleString()}`;

       cartItem.appendChild(imageElement);
       cartItem.appendChild(itemName);
       cartItem.appendChild(quantityControl);
       cartItem.appendChild(itemPrice);


        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        // Add event listener to remove button
        removeButton.addEventListener("click", function() {
            removeFromCart(item.id); // Calling line 108
        });

        // Append remove button to cart item
        cartItem.appendChild(quantityControl);
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });
    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.textContent = `Total: UGX ${total.toLocaleString()}`;
    cartContainer.appendChild(totalElement);

    // Create checkout button
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = `Checkout (UGX ${total.toLocaleString()})`;
    checkoutButton.classList.add("checkout-button");

    // Add event listener to checkout button
    checkoutButton.addEventListener("click", function() {
        checkout(total);
    });

    // Append checkout button to cart container
    cartContainer.appendChild(checkoutButton);

    }

    // Function to remove item from cart
    function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();

    // Function to checkout
    function checkout(total) {
        if (total) {
            cart = [];
        }
        cart = []; // Clear the cart
        renderCart(); // Render an empty cart
        
    }
}
});


