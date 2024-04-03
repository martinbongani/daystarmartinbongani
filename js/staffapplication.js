document.addEventListener('DOMContentLoaded', function() {
    const addEducationBtn = document.getElementById('addEducation');
    const educationFields = document.getElementById('educationFields');

    addEducationBtn.addEventListener('click', function() {
        const educationCount = educationFields.querySelectorAll('div').length + 1;

        const educationDiv = document.createElement('div');
        educationDiv.innerHTML = `
            <label for="education${educationCount}">Education ${educationCount}:</label>
            <input type="text" id="education${educationCount}" name="education${educationCount}" required>
            <label for="degree${educationCount}">Degree:</label>
            <input type="text" id="degree${educationCount}" name="degree${educationCount}" required>
            <label for="major${educationCount}">Major:</label>
            <input type="text" id="major${educationCount}" name="major${educationCount}" required>
            <label for="school${educationCount}">School/Institution/University:</label>
            <input type="text" id="school${educationCount}" name="school${educationCount}" required>
            <button type="button" class="removeEducation">Remove</button>
        `;

        educationFields.appendChild(educationDiv);
    });

    educationFields.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeEducation')) {
            event.target.parentElement.remove();
        }
    });

    const addEmploymentBtn = document.getElementById('addEmployment');
    const employmentFields = document.getElementById('employmentFields');

    addEmploymentBtn.addEventListener('click', function() {
        const employmentCount = employmentFields.querySelectorAll('div').length + 1;

        const employmentDiv = document.createElement('div');
        employmentDiv.innerHTML = `
            <label for="employmentYear${employmentCount}">Year:</label>
            <input type="text" id="employmentYear${employmentCount}" name="employmentYear${employmentCount}" required>
            <label for="employmentCompany${employmentCount}">Company:</label>
            <input type="text" id="employmentCompany${employmentCount}" name="employmentCompany${employmentCount}" required>
            <label for="employmentPosition${employmentCount}">Position:</label>
            <input type="text" id="employmentPosition${employmentCount}" name="employmentPosition${employmentCount}" required>
            <button type="button" class="removeEmployment">Remove</button>
        `;

        employmentFields.appendChild(employmentDiv);
    });

    employmentFields.addEventListener('click', function(event) {
        if (event.target.classList.contains('removeEmployment')) {
            event.target.parentElement.remove();
        }
    });
});
