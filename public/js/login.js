document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            // Submit the form if validation passes
            form.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        // Reset validation styles
        resetValidationStyles();

        // Username validation
        const emailInput = form.elements['email'];
        if (emailInput.value.trim() === '') {
            isValid = false;
            setInvalid(emailInput, 'Email cannot be empty');
        }

        // Password validation
        const passwordInput = form.elements['password'];
        if (passwordInput.value.trim() === '') {
            isValid = false;
            setInvalid(passwordInput, 'Password cannot be empty');
        }

        return isValid;
    }

    function setInvalid(field, message) {
        field.classList.add('is-invalid');
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        errorElement.innerText = message;
        field.parentNode.appendChild(errorElement);
    }

    function resetValidationStyles() {
        const invalidFields = form.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => {
            field.classList.remove('is-invalid');
            const errorElement = field.parentNode.querySelector('.invalid-feedback');
            if (errorElement) {
                errorElement.remove();
            }
        });
    }
});
