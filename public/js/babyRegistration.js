function validateForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value.trim();
    const fatherName = document.getElementById('fatherName').value.trim();
    const fatherEmail = document.getElementById('fatherEmail').value.trim();
    const fatherContact = document.getElementById('fatherContact').value.trim();
    const fatherOccupation = document.getElementById('fatherOccupation').value.trim();
    const motherName = document.getElementById('motherName').value.trim();
    const motherEmail = document.getElementById('motherEmail').value.trim();
    const motherContact = document.getElementById('motherContact').value.trim();
    const motherOccupation = document.getElementById('motherOccupation').value.trim();
    const guardianName = document.getElementById('guardianName').value.trim();
    const babyNumber = document.getElementById('babyNumber').value.trim();
    const parentResponsibility = document.querySelector('input[name="parentResponsibility"]:checked');

    if (!firstName || !lastName || !dob || !gender || !address || !babyNumber || !parentResponsibility) {
        alert('Please fill in all required fields.');
        return false;
    }

    const fatherDeceased = document.getElementById('fatherDeceased').checked;
    if (fatherDeceased) {
        document.getElementById('fatherName').value = '';
        document.getElementById('fatherEmail').value = '';
        document.getElementById('fatherContact').value = '';
        document.getElementById('fatherOccupation').value = '';

        document.getElementById('fatherName').disabled = true;
        document.getElementById('fatherEmail').disabled = true;
        document.getElementById('fatherContact').disabled = true;
        document.getElementById('fatherOccupation').disabled = true;
    } else {
        document.getElementById('fatherName').disabled = false;
        document.getElementById('fatherEmail').disabled = false;
        document.getElementById('fatherContact').disabled = false;
        document.getElementById('fatherOccupation').disabled = false;
    }

    const motherDeceased = document.getElementById('motherDeceased').checked;
    if (motherDeceased) {
        document.getElementById('motherName').value = '';
        document.getElementById('motherEmail').value = '';
        document.getElementById('motherContact').value = '';
        document.getElementById('motherOccupation').value = '';

        document.getElementById('motherName').disabled = true;
        document.getElementById('motherEmail').disabled = true;
        document.getElementById('motherContact').disabled = true;
        document.getElementById('motherOccupation').disabled = true;
    } else {
        document.getElementById('motherName').disabled = false;
        document.getElementById('motherEmail').disabled = false;
        document.getElementById('motherContact').disabled = false;
        document.getElementById('motherOccupation').disabled = false;
    }

    console.log("Form validation successful.");
    return true;
}

document.getElementById('fatherDeceased').addEventListener('change', function() {
    console.log("Father deceased checkbox changed.");
    toggleFatherFields(this.checked);
});

document.getElementById('motherDeceased').addEventListener('change', function() {
    console.log("Mother deceased checkbox changed.");
    toggleMotherFields(this.checked);
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    console.log("Form submitted...");
    if (!validateForm()) {
        event.preventDefault();
    }
});

function toggleFatherFields(checked) {
    const fatherNameInput = document.getElementById('fatherName');
    const fatherEmailInput = document.getElementById('fatherEmail');
    const fatherContactInput = document.getElementById('fatherContact');
    const fatherOccupationInput = document.getElementById('fatherOccupation');

    fatherNameInput.value = '';
    fatherEmailInput.value = '';
    fatherContactInput.value = '';
    fatherOccupationInput.value = '';

    fatherNameInput.disabled = checked;
    fatherEmailInput.disabled = checked;
    fatherContactInput.disabled = checked;
    fatherOccupationInput.disabled = checked;
}

function toggleMotherFields(checked) {
    const motherNameInput = document.getElementById('motherName');
    const motherEmailInput = document.getElementById('motherEmail');
    const motherContactInput = document.getElementById('motherContact');
    const motherOccupationInput = document.getElementById('motherOccupation');

    motherNameInput.value = '';
    motherEmailInput.value = '';
    motherContactInput.value = '';
    motherOccupationInput.value = '';

    motherNameInput.disabled = checked;
    motherEmailInput.disabled = checked;
    motherContactInput.disabled = checked;
    motherOccupationInput.disabled = checked;
}
