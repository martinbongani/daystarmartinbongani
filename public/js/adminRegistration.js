function validateForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");

    // Reset previous errors
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (firstName === "") {
      firstNameError.textContent = "First Name is required";
      isValid = false;
    }

    if (lastName === "") {
      lastNameError.textContent = "Last Name is required";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Invalid Email Format";
      isValid = false;
    }

    if (password === "") {
      passwordError.textContent = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        // Display success message
        successMessage.style.display = "block";

        // Reset form after a delay (for demo purposes)
        setTimeout(() => {
          document.getElementById("registrationForm").reset();
          successMessage.style.display = "none";
        }, 3000); // Reset after 3 seconds
      }, 500); // Simulate server response delay
    }

    return false; // Prevent actual form submission for demo
  }

  function isValidEmail(email) {
    // Very basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
