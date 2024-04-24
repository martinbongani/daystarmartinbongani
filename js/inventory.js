let inventory = []; // Array to store inventory items

// Function to add a new item to the inventory
function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemUnit = document.getElementById('itemUnit').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value.trim());
    const itemImage = document.getElementById('itemImage').value.trim();

    if (itemName === '' || itemUnit === '' || isNaN(itemPrice) || itemPrice <= 0 || itemImage === '') {
        alert('Please fill in all fields correctly.');
        return;
    }

    const newItem = {
        name: itemName,
        unit: itemUnit,
        price: itemPrice,
        image: itemImage,
        received: 0,
        issued: 0,
        balance: 0
    };

    inventory.push(newItem);
    renderInventory();
    clearForm();
}

// Function to render the inventory table
function renderInventory() {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    inventory.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.unit}</td>
            <td>${formatNumber(item.price)}</td>
            <td><input type="number" value="${item.received}" id="received${index}"></td>
            <td><input type="number" value="${item.issued}" id="issued${index}"></td>
            <td>${formatNumber(item.balance)}</td>
            <td><button class="action-btn" onclick="updateBalance(${index})">OK</button></td>
        `;

        tbody.appendChild(row);
    });
}

// Function to update balance based on received or issued quantity
function updateBalance(index) {
    const receivedInput = document.getElementById(`received${index}`);
    const issuedInput = document.getElementById(`issued${index}`);

    const received = parseInt(receivedInput.value) || 0;
    const issued = parseInt(issuedInput.value) || 0;

    const currentBalance = inventory[index].received - inventory[index].issued;

    if (received < 0 || issued < 0 || issued > currentBalance) {
        alert('Invalid quantity. Check received and issued values.');
        return;
    }

    // Update received and issued quantities
    inventory[index].received = received;
    inventory[index].issued = issued;

    // Update balance
    const newBalance = inventory[index].received - inventory[index].issued;
    inventory[index].balance = newBalance;

    renderInventory();

    // Clear received and issued fields
    receivedInput.value = '';
    issuedInput.value = '';
}

// Function to clear the form fields after adding an item
function clearForm() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemUnit').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemImage').value = '';
}

// Function to format number with commas for better readability
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
