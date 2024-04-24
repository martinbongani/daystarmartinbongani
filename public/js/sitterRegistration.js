let sitterCount = 0;

function validateForm() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.border = '1px solid red'; // Highlight empty fields
        } else {
            input.style.border = '1px solid #ccc'; // Reset border
        }
    });

    if (!isValid) {
        return false; // Prevent form submission if any required field is empty
    }

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = `${firstName} ${lastName}`;
    const sitterNumber = `SN00${++sitterCount}/24`;

    // Display popup with registration details
    const registrationMessage = `Sitter ${fullName} registered successfully with Sitter Number: ${sitterNumber}`;
    document.getElementById('registrationMessage').textContent = registrationMessage;
    document.getElementById('popup-sitterReg').style.display = 'block';

    // Clear form fields
    form.reset();

    return false; // Prevent form submission
}

function closePopup() {
    document.getElementById('popup-sitterReg').style.display = 'none';
}   
   
