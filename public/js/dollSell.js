    function validateForm() {
      const dollName = document.getElementById('dollName').value.trim();
      const dateOfSell = document.getElementById('dateOfSell').value;
  
      if (!dollName || !dateOfSell) {
        alert('Please fill out all fields correctly.');
        return false; // Prevent form submission
      }
      return true; // Allow form submission
    }

  