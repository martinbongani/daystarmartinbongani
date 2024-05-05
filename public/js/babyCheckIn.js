function validateForm() {
    // Retrieve form input values
    const broughtBy = document.getElementById('broughtBy').value.trim();
    const stayPeriod = document.getElementById('stayPeriod').value;

    // Validate required fields
    if (!broughtBy || !stayPeriod) {
        alert('Please fill out all required fields.');
        return false; // Prevent form submission if validation fails
    }

    return true; // Allow form submission if validation passes
}

function updateFee() {
    const stayPeriod = document.getElementById('stayPeriod').value;
    const feeInput = document.getElementById('fee');

    // Update fee based on selected stay period
    if (stayPeriod === 'Half Day') {
        feeInput.value = '10000'; // Set fee for Half Day
    } else if (stayPeriod === 'Full Day') {
        feeInput.value = '15000'; // Set fee for Full Day
    } else {
        feeInput.value = ''; // Clear fee input if stay period is not selected
    }
}

// Event listeners to trigger functions on form interactions
document.getElementById('stayPeriod').addEventListener('change', updateFee);

updateFee(); // Initial fee update based on default stay period

