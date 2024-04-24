const items = [
    { name: 'Baby Doll', price: 20000, image: 'baby-doll.jpg' },
    { name: 'Teddy Bear', price: 25000, image: 'teddy-bear.jpg' },
    { name: 'Barbie Doll', price: 30000, image: 'barbie-doll.jpg' },
    { name: 'Superman Doll', price: 35000, image: 'superman-doll.jpg' },
    { name: 'Elsa Doll', price: 28000, image: 'elsa-doll.jpg' },
    { name: 'Panda Plush Toy', price: 22000, image: 'panda-plush.jpg' },
    { name: 'Unicorn Plush Toy', price: 26000, image: 'unicorn-plush.jpg' },
    { name: 'Puppy Doll', price: 27000, image: 'puppy-doll.jpg' },
    { name: 'Mermaid Doll', price: 32000, image: 'mermaid-doll.jpg' },
    { name: 'Tiger Plush Toy', price: 24000, image: 'tiger-plush.jpg' },
    { name: 'Dinosaur Doll', price: 31000, image: 'dinosaur-doll.jpg' },
    { name: 'Rabbit Plush Toy', price: 23000, image: 'rabbit-plush.jpg' }
];

const itemsContainer = document.getElementById('itemsContainer');
const cart = document.getElementById('cart');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartItems = [];

function renderItems() {
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - UGX ${item.price.toLocaleString()}</p>
            <button onclick="addItemToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

function toggleCart() {
    cart.style.right = cart.style.right === '0px' ? '-320px' : '0px';
}

function updateCartButton() {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartToggleBtn.textContent = `Cart (${itemCount})`;
}

function addItemToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    updateCartButton();
    cartItemsElement.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="quantity">
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)">
                <button onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = `UGX ${total.toLocaleString()}`;
}

function updateQuantity(name, quantity) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
    }
}

function removeItem(name) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCart();
    }
}

function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const itemsList = cartItems.map(item => `${item.name} - UGX ${item.price.toLocaleString()} x ${item.quantity}`).join('\n');
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    alert(`Items in Cart:\n\n${itemsList}\n\nTotal Amount: UGX ${totalAmount.toLocaleString()}`);

    toggleCart(); // Hide cart after checkout
    cartItems.length = 0;
    updateCart();
}

renderItems();
cartToggleBtn.addEventListener('click', toggleCart);
