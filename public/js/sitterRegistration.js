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
}

   
