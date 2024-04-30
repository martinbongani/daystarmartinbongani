function validateForm() {
    const broughtBy = document.getElementById('broughtBy').value;
    const stayPeriod = document.getElementById('stayPeriod').value;
    
    if (!broughtBy || !stayPeriod) {
        alert('Please fill out all required fields.');
        return false;
    }
    return true;
}

function updateFee() {
    const stayPeriod = document.getElementById('stayPeriod').value;
    const feeInput = document.getElementById('fee');
    
    if (stayPeriod === 'halfDay') {
        feeInput.value = '10000';
    } else if (stayPeriod === 'fullDay') {
        feeInput.value = '15000';
    } else {
        feeInput.value = '';
    }
}

// Set current time in Arrival Time input when Check-in button is clicked
function setArrivalTime() {
    const arrivalTimeInput = document.getElementById('arrivalTime');
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    arrivalTimeInput.value = currentTime;
}