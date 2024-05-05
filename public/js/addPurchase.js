function validateForm() {
    const item = document.getElementById('item').value;
    const unit = document.getElementById('unit').value.trim();
    const quantity = document.getElementById('quantity').value;
    const rate = document.getElementById('rate').value;

    // Validate required fields
    if (!item || !unit || !quantity || !rate) {
        alert('Please fill out all required fields.');
        return false;
    }

    // Validate quantity and rate are positive numbers
    if (isNaN(quantity) || quantity <= 0 || isNaN(rate) || rate <= 0) {
        alert('Please enter valid values for quantity and rate.');
        return false;
    }

    return true;
}

// Automatically compute amount based on rate and quantity
function computeAmount() {
    const quantity = document.getElementById('quantity').value;
    const rate = document.getElementById('rate').value;
    const amountInput = document.getElementById('amount');

    // Calculate amount if quantity and rate are valid numbers
    if (!isNaN(quantity) && quantity > 0 && !isNaN(rate) && rate > 0) {
        const amount = quantity * rate;
        amountInput.value = amount.toFixed(2); // Set the computed amount with 2 decimal places
    } else {
        amountInput.value = ''; // Reset amount if inputs are invalid
    }
}

// Attach event listeners to input fields for computing amount
document.getElementById('quantity').addEventListener('input', computeAmount);
document.getElementById('rate').addEventListener('input', computeAmount);
