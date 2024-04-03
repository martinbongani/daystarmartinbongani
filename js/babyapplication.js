document.addEventListener("DOMContentLoaded", function() {
    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get form values
        const firstName = document.getElementById("exampleInputFirstName").value;
        const lastName = document.getElementById("exampleInputLastName").value;
        const dob = document.getElementById("exampleDOB").value;
        const address = document.getElementById("exampleInputAddress").value;
        const religion = document.getElementById("religionSelect").value;
        const fatherFirstName = document.getElementById("fatherFirstName").value;
        const fatherLastName = document.getElementById("fatherLastName").value;
        const fatherEmail = document.getElementById("fatherEmail").value;
        const fatherPhone = document.getElementById("fatherPhone").value;
        const fatherNIN = document.getElementById("fatherNIN").value;
        const fatherDOB = document.getElementById("fatherDOB").value;
        const fatherOccupation = document.getElementById("fatherOccupation").value;
        const fatherAddress = document.getElementById("fatherAddress").value;
        const motherFirstName = document.getElementById("motherFirstName").value;
        const motherLastName = document.getElementById("motherLastName").value;
        const motherEmail = document.getElementById("motherEmail").value;
        const motherPhone = document.getElementById("motherPhone").value;
        const motherNIN = document.getElementById("motherNIN").value;
        const motherDOB = document.getElementById("motherDOB").value;
        const motherOccupation = document.getElementById("motherOccupation").value;
        const motherAddress = document.getElementById("motherAddress").value;

        const formData = {
            babyDetails: {
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                address: address,
                religion: religion
            },
            fatherDetails: {
                firstName: fatherFirstName,
                lastName: fatherLastName,
                email: fatherEmail,
                phone: fatherPhone,
                nin: fatherNIN,
                dob: fatherDOB,
                occupation: fatherOccupation,
                address: fatherAddress
            },
            motherDetails: {
                firstName: motherFirstName,
                lastName: motherLastName,
                email: motherEmail,
                phone: motherPhone,
                nin: motherNIN,
                dob: motherDOB,
                occupation: motherOccupation,
                address: motherAddress
            }
        };

        console.log(formData);
        alert("Form submitted successfully!");

        document.getElementById("form").reset();
    }

    document.getElementById("form").addEventListener("submit", handleFormSubmit);
});
