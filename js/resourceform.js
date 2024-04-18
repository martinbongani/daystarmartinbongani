let items = [];
let resourceCounter = 1;

// Function to initialize the form and set default values
function initializeForm() {
    const dateField = document.getElementById("date-resourceForm");
    const today = new Date().toISOString().substr(0, 10); // Get today's date in YYYY-MM-DD format
    dateField.value = today;
    dateField.disabled = true; // Disable the date field

    const resourceNumberField = document.getElementById("resourceNumber");
    const newResourceNumber = generateResourceNumber();
    resourceNumberField.value = newResourceNumber;
    resourceNumberField.disabled = true; // Disable the resource number field
}

// Event listener to initialize the form when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeForm();
});

function addItem() {
    const item = document.getElementById("item-resourceForm").value;
    const quantity = parseInt(document.getElementById("quantity-resourceForm").value);
    const rate = parseFloat(document.getElementById("rate-resourceForm").value);

    if (!item || !quantity || !rate) {
        alert("Please fill in all item details.");
        return;
    }

    const amount = quantity * rate;
    items.push({ item, quantity, rate, amount });

    renderItems();
    calculateTotalAmount();
    clearItemFields();
}

function renderItems() {
    const tbody = document.querySelector("#itemTable-resourceForm tbody");
    tbody.innerHTML = '';

    items.forEach((item) => {
        const row = `<tr class="tr-resourceForm">
            <td class="td-resourceForm">${item.item}</td>
            <td class="td-resourceForm">${item.quantity}</td>
            <td class="td-resourceForm">UGX ${item.rate.toLocaleString()}</td>
            <td class="td-resourceForm">UGX ${item.amount.toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function calculateTotalAmount() {
    const totalAmount = items.reduce((acc, item) => acc + item.amount, 0);
    document.getElementById("totalAmount-resourceForm").value = `UGX ${totalAmount.toLocaleString()}`;
}

function clearItemFields() {
    document.getElementById("item-resourceForm").value = '';
    document.getElementById("quantity-resourceForm").value = '';
    document.getElementById("rate-resourceForm").value = '';
}

function generateRequest() {
    const isValid = validateForm();
    if (!isValid) return;

    const confirmation = confirm("Do you want to generate this resource request?");
    if (confirmation) {
        const resourceNumber = document.getElementById("resourceNumber").value;
        alert(`Resource Request Generated Successfully!\nResource Number: ${resourceNumber}`);
        clearForm();
    }
}

function validateForm() {
    const department = document.getElementById("department-resourceForm").value;

    if (!department) {
        alert("Please select a department.");
        return false;
    }

    return true;
}

function clearForm() {
    document.getElementById("form-resourceForm").reset();
    items = [];
    renderItems();
    calculateTotalAmount();

    // Reinitialize the form to update the date and resource number
    initializeForm();
}

function generateResourceNumber() {
    const newResourceNumber = `RR${resourceCounter.toString().padStart(3, '0')}`;
    resourceCounter++;
    return newResourceNumber;
}

