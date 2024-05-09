document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
      // Validate each input field
      const arrivalTime = document.getElementById('arrivalTime').value;

      if (!arrivalTime) {
        alert('Please provide an arrival time.');
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });