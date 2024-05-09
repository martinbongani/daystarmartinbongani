document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
      // Validate each input field
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const takenBy = document.getElementById('takenBy').value;
      const departureTime = document.getElementById('departureTime').value;
      const comment = document.getElementById('comment').value;

      if (!firstName || !lastName || !takenBy || !departureTime || !comment) {
        alert('Please fill in all required fields.');
        event.preventDefault(); // Prevent form submission if validation fails
      }
    });
  });