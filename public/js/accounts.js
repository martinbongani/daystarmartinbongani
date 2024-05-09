function validateForm() {
    const description = document.getElementById('description').value.trim();
    const transactionRef = document.getElementById('transactionRef').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const classification = document.getElementById('classification').value;
    const transactionDate = document.getElementById('transactionDate').value;

    // Check if any field is empty
    if (!description || !transactionRef || !amount || !classification || !transactionDate) {
      alert('Please fill out all required fields.');
      return false; // Prevent form submission
    }

    // Check if amount is a valid number and greater than 0
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid positive amount.');
      return false; // Prevent form submission
    }

    // Validation passed, allow form submission
    return true;
  }