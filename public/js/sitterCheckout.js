document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (event) => {
      // Retrieve departure time value
      const departureTimeInput = document.getElementById('departureTime');
      const departureTime = departureTimeInput.value.trim();

      // Check if departure time is provided
      if (!departureTime) {
        alert('Please provide the departure time.');
        event.preventDefault(); // Prevent form submission
        return;
      }
    });
  });