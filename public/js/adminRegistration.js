function validateForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Check if any field is empty
  if (!firstName || !lastName || !email || !password) {
    alert('Please fill out all required fields.');
    return false; // Prevent form submission
  }

  // Check email format using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false; // Prevent form submission
  }

  // Check password strength (optional)
  // Example: Check if password is at least 8 characters long
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false; // Prevent form submission
  }

  // Validation passed, allow form submission
  return true;
}