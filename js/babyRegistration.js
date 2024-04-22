let babyCount = 0;

function registerBaby() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const fatherName = document.getElementById('fatherName').value;
    const motherName = document.getElementById('motherName').value;
    const guardianName = document.getElementById('guardianName').value;
    const fatherDeceased = document.getElementById('fatherDeceased').checked;
    const motherDeceased = document.getElementById('motherDeceased').checked;

    // Check if all required fields are filled or made non-functional
    if (!firstName || !lastName || !dob || !gender || !address) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validation for mutual exclusivity of father/mother name and deceased checkbox
    if (fatherName && fatherDeceased) {
        alert('Please provide Father\'s Name or select Father Deceased, not both.');
        return;
    }

    if (motherName && motherDeceased) {
        alert('Please provide Mother\'s Name or select Mother Deceased, not both.');
        return;
    }

    // If both parents are deceased, require guardian's name
    if (fatherDeceased && motherDeceased && !guardianName) {
        alert('Please provide Guardian\'s Name when both parents are deceased.');
        return;
    }

    // Increment baby count
    babyCount++;

    // Display popup with baby registration details
    const fullName = `${firstName} ${lastName}`;
    const registrationMessage = `Baby ${fullName} registered successfully with ID: BN00${babyCount}/24!`;
    document.getElementById('registrationMessage').textContent = registrationMessage;
    document.getElementById('popup-babyReg').style.display = 'block';

    // Clear form fields
    document.getElementById('registrationForm').reset();
}

function closePopup() {
    document.getElementById('popup-babyReg').style.display = 'none';
}

function toggleFatherName(checkbox) {
    const fatherNameInput = document.getElementById('fatherName');
    if (checkbox.checked) {
        fatherNameInput.value = '';
        fatherNameInput.disabled = true;
    } else {
        fatherNameInput.disabled = false;
    }
    toggleGuardianField();
}

function toggleMotherName(checkbox) {
    const motherNameInput = document.getElementById('motherName');
    if (checkbox.checked) {
        motherNameInput.value = '';
        motherNameInput.disabled = true;
    } else {
        motherNameInput.disabled = false;
    }
    toggleGuardianField();
}

function toggleGuardianField() {
    const fatherDeceased = document.getElementById('fatherDeceased').checked;
    const motherDeceased = document.getElementById('motherDeceased').checked;
    const guardianField = document.getElementById('guardianField');
    guardianField.classList.toggle('hidden', !(fatherDeceased && motherDeceased));
}
