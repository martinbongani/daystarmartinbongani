function validateForm() {
    // Retrieve form input values
    const dollName = document.getElementById('dollName').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const rate = document.getElementById('rate').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const imageUpload = document.getElementById('imageUpload').value.trim();
    const description = document.getElementById('description').value.trim();
    
    // Check if any field is empty
    if (!dollName || !quantity || !rate || !amount || !imageUpload || !description) {
      alert('Please fill out all fields.');
      return false; // Prevent form submission
    }
    
    // Check if quantity, rate, and amount are valid numbers
    if (isNaN(quantity) || isNaN(rate) || isNaN(amount)) {
      alert('Quantity, Rate, and Amount must be valid numbers.');
      return false; // Prevent form submission
    }
    
    // Validation passed, allow form submission
    return true;
  }