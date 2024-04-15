document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const usersReportTypeSelect = document.getElementById('report-type-select');
    const usersGraphicalReportChart = document.getElementById('graphical-report-chart').getContext('2d');
    const form = document.getElementById('babyRegistrationForm');
    const babyList = document.getElementById('babyList');
    const employeeList = document.getElementById('employeeList');
    const modal = document.getElementById('modal');
    const applicationDetails = document.getElementById('applicationDetails');
    const acceptButton = document.getElementById('acceptButton');
    const rejectButton = document.getElementById('rejectButton');
    const closeButton = document.querySelector('.close');


    // Function to switch active section
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.section-users');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active-users');
        } else {
            section.classList.remove('active-users');
        }
    });
}

// Event listeners for navigation
    const links = document.querySelectorAll('.dash ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            switchSection(targetId);
        });
    });


    // Function to fetch and display real-time updates in cards
    function fetchUsersRealTimeUpdates() {
        // Simulate AJAX request to fetch real-time updates (replace with actual API call)
        const mockUpdates = [
            { type: 'Babies Enrolled', count: 165 },
            { type: 'Babies Present', count: 153 },
            { type: 'Sitters Enrolled', count: 65 },
            { type: 'Sitters Present', count: 56 },
            { type: 'Total Revenue', amount: 'Shs 55,356,000' },
            { type: 'Expenses', amount: 'Shs 29,635,500' }
        ];

        usersRealtimeCardsContainer.innerHTML = ''; // Clear existing content

        mockUpdates.forEach(update => {
            const card = document.createElement('div');
            card.classList.add('card-users');
            if (update.amount) {
                card.innerHTML = `
                    <h3>${update.type}</h3>
                    <p>${update.amount}</p>
                `;
            } else {
                card.innerHTML = `
                    <h3>${update.type}</h3>
                    <p>${update.count}</p>
                `;
            }
            usersRealtimeCardsContainer.appendChild(card);
        });
    }

    // Function to fetch and display daily tasks
    function fetchUsersDailyTasks() {
        // Simulate AJAX request to fetch daily tasks (replace with actual API call)
        const mockTasks = [
            'Register Babies',
            'Register Sitters',
            'Reviewing Parent Feedback',
            'Staff Meeting',
            'Reviewing Applications',
            'Reviewing Departmental Reports and Performance'
        ];

        usersTasksContainer.innerHTML = ''; // Clear existing content

        mockTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-users');
            taskElement.textContent = task;
            usersTasksContainer.appendChild(taskElement);
        });
    }

    // Function to render graphical report based on selected type
    function renderUsersGraphicalReport(reportType) {
        // Simulate data for graphical report (replace with actual data retrieval)
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        let data, backgroundColor, borderColor;
       
        switch (reportType) {
            case 'bar':
                data = [4000, 5500, 7000, 4000, 9000]; // Example bar chart data
                backgroundColor = 'rgba(255, 159, 64, 0.5)';
                borderColor = 'rgba(255, 159, 64, 1)';
                break;
            case 'line':
                data = [3000, 4500, 6000, 3500, 8000]; // Example line chart data
                backgroundColor = 'rgba(54, 162, 235, 0.5)';
                borderColor = 'rgba(54, 162, 235, 1)';
                break;
            case 'pie':
                data = [30, 20, 50]; // Example pie chart data
                backgroundColor = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)'];
                borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'];
                break;
            default:
                return;
        }

        const chartConfig = {
            type: reportType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Overall Performance',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

 // Destroy existing chart if it exists
 if (window.usersGraphicalReport) {
    window.usersGraphicalReport.destroy();
}

// Create new chart
window.usersGraphicalReport = new Chart(usersGraphicalReportChart, chartConfig);
}

    // Function to render graphical report based on selected type
    function renderFinancialReport(reportType) {
        // Simulate data for graphical report (replace with actual data retrieval)
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        let data, backgroundColor, borderColor;
       
        switch (reportType) {
            case 'bar':
                data = [7000, 4500, 9000, 3000, 6000]; // Example bar chart data
                backgroundColor = 'rgba(255, 159, 64, 0.5)';
                borderColor = 'rgba(255, 159, 64, 1)';
                break;
            case 'line':
                data = [7000, 3500, 8000, 4500, 8500]; // Example line chart data
                backgroundColor = 'rgba(54, 162, 235, 0.5)';
                borderColor = 'rgba(54, 162, 235, 1)';
                break;
            case 'pie':
                data = [20, 80, 50]; // Example pie chart data
                backgroundColor = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)'];
                borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'];
                break;
            default:
                return;
        }

        const chartConfig = {
            type: reportType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Financial Performance',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

 // Destroy existing chart if it exists
 if (window.financialReport) {
    window.financialReport.destroy();
}

// Create new chart
window.financialReport = new Chart(financialReportChart, chartConfig);
}


// Event listener for report type selection
usersReportTypeSelect.addEventListener('change', function() {
const selectedReportType = this.value;
renderUsersGraphicalReport(selectedReportType);
 } )

// Event listener for report type selection
usersReportTypeSelect.addEventListener('change', function() {
    const selectedReportType = this.value;
    renderFinancialReport(selectedReportType);
 } )
    

  // Function to display default content (real-time updates) when no tab is selected
  function displayDefaultContent() {
    fetchUsersRealTimeUpdates(); // Display real-time updates by default
}
 
    // Event listener for tab navigation and content loading
    document.querySelectorAll('.sidebar-users ul li a').forEach(tabLink => {
        tabLink.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('href').substring(1);
            showUsersTab(tabId);
        });
    });

    // Function to display selected tab content
    function showUsersTab(tabId) {
        const tabContents = document.querySelectorAll('.tabcontent-users');
        tabContents.forEach(content => {
            content.style.display = 'none';
        });

        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block';

            if (tabId === 'realtime-updates') {
                fetchUsersRealTimeUpdates();
            } else if (tabId === 'daily-tasks') {
                fetchUsersDailyTasks();
            } else if (tabId === 'graphical-reports') {
                const selectedReportType = usersReportTypeSelect.value;
                renderUsersGraphicalReport(selectedReportType);
            }
            else if (tabId === 'financial-performance') {
                const selectedReportType = usersReportTypeSelect.value;
                renderFinancialReport(selectedReportType);
            }
        }
    }

    // Event listener for report type selection
    usersReportTypeSelect.addEventListener('change', function() {
        const selectedReportType = this.value;
        renderUsersGraphicalReport(selectedReportType);
    });

    usersReportTypeSelect.addEventListener('change', function() {
        const selectedReportType = this.value;
        renderFinancialReport(selectedReportType);
    });

    // Show default tab on page load
    const defaultTab = document.querySelector('.sidebar-users ul li a');
    if (defaultTab) {
        const defaultTabId = defaultTab.getAttribute('href').substring(1);
        showUsersTab(defaultTabId);
    } else {
        displayDefaultContent();
    }


    // Admin Baby Registration
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        // Retrieve input values
        const firstName = document.getElementById('firstNameBabyRegistration').value.trim();
        const lastName = document.getElementById('lastNameBabyRegistration').value.trim();
        const gender = document.getElementById('genderBabyRegistration').value;

        // Retrieve error message elements
        const errorFirstName = document.getElementById('errorFirstName');
        const errorLastName = document.getElementById('errorLastName');
        const errorGender = document.getElementById('errorGender');

        // Reset previous error messages
        errorFirstName.textContent = '';
        errorLastName.textContent = '';
        errorGender.textContent = '';

        let isValid = true;

        // Validate each input field
        if (firstName === '') {
            errorFirstName.textContent = 'First name is required';
            isValid = false;
        }

        if (lastName === '') {
            errorLastName.textContent = 'Last name is required';
            isValid = false;
        }

        if (gender === '') {
            errorGender.textContent = 'Please select gender';
            isValid = false;
        }

        if (isValid) {
            // If form is valid, proceed with registration logic
            registerBaby(firstName, lastName, gender);
        }
    }

    function registerBaby(firstName, lastName, gender) {
        // Replace this with actual registration logic (e.g., sending data to server)
        const successMessage = `Baby ${firstName} ${lastName} (${gender}) registered successfully!`;
        displaySuccessMessage(successMessage);
        clearForm();
    }

    function displaySuccessMessage(message) {
        const successMessageDiv = document.getElementById('successMessage');
        successMessageDiv.textContent = message;
    }

    function clearForm() {
        form.reset();
    }
    
// Admin Applications
    // Counter variables to track application numbers
    let babyApplicationCounter = 0;
    let employeeApplicationCounter = 0;

    // Function to generate sequential application numbers
    function generateApplicationNumber(type) {
        if (type === 'baby') {
            babyApplicationCounter++;
            return `Baby Application ${padNumber(babyApplicationCounter)}/2024`;
        } else if (type === 'employee') {
            employeeApplicationCounter++;
            return `Staff Application ${padNumber(employeeApplicationCounter)}/2024`;
        }
    }

    // Helper function to pad numbers with leading zeros (e.g., 001, 002, ...)
    function padNumber(num) {
        return num.toString().padStart(3, '0');
    }

    // Render applications in the list with formatted numbers
    function renderApplicationsWithNumbers(applications, listElement) {
        listElement.innerHTML = ''; // Clear existing list

        applications.forEach(application => {
            const listItem = document.createElement('li');
            const applicationNumber = generateApplicationNumber(application.type);
            listItem.textContent = applicationNumber;
            listItem.addEventListener('click', () => showApplicationDetails(application));
            listElement.appendChild(listItem);
        });
    }

    // Simulated applications (up to 10 for each category)
    const numApplications = 10; // Number of applications per category
    const babyApplications = generateRandomApplications(numApplications, 'baby');
    const employeeApplications = generateRandomApplications(numApplications, 'employee');

    // Display applications in the UI with formatted numbers
    renderApplicationsWithNumbers(babyApplications, babyList);
    renderApplicationsWithNumbers(employeeApplications, employeeList);

    // Function to generate random applications
    function generateRandomApplications(num, type) {
        const applications = [];

        for (let i = 0; i < num; i++) {
            applications.push({ type });
        }

        return applications;
    }

    // Function to display application details in the modal
    function showApplicationDetails(application) {
        modal.style.display = 'block';
        applicationDetails.innerHTML = `
            <h2>${generateApplicationNumber(application.type)} Details</h2>
            <p>Type: ${application.type}</p>
            <p>Details: (Add specific details here)</p>
        `;

        // Handle accept button click
        acceptButton.onclick = function() {
            acceptApplication(application);
            modal.style.display = 'none';
        };

        // Handle reject button click
        rejectButton.onclick = function() {
            rejectApplication(application);
            modal.style.display = 'none';
        };

        // Close modal when the close button is clicked
        closeButton.onclick = function() {
            modal.style.display = 'none';
        };
    }

    // Function to accept application
    function acceptApplication(application) {
        const { type } = application;
        const applicationNumber = generateApplicationNumber(type);
        const enrollmentToken = generateEnrollmentToken();

        // Send success email to the applicant
        sendSuccessEmail(application, enrollmentToken);

        // Display success message
        alert(`Application ${applicationNumber} accepted!`);
    }

    // Function to reject application
    function rejectApplication(application) {
        const { type } = application;
        const applicationNumber = generateApplicationNumber(type);

        // Implement rejection logic (if needed)
        alert(`Application ${applicationNumber} rejected.`);
    }

    // Function to send success email with enrollment token
    function sendSuccessEmail(application, enrollmentToken) {
        const { type } = application;
        const applicationNumber = generateApplicationNumber(type);
        const email = `${type.toLowerCase()}${applicationNumber.split(' ')[2].split("/")[2]}@example.com`;
        const message = `Dear applicant,\n\nYour application (${applicationNumber}) has been accepted!\nYour enrollment token is: ${enrollmentToken}\n\nPlease present this token on your first day at the daycare center.\n\nRegards,\nDaycare Center`;

        // Simulating email sending (replace with actual email sending logic)
        console.log(`Sending email to ${email}: ${message}`);
    }

    // Function to generate enrollment token (dummy implementation)
    function generateEnrollmentToken() {
        return Math.random().toString(36).substr(2, 10).toUpperCase();
    }

// IT Breaches
function addLogEntry(timestamp, location, source, details) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <strong>${timestamp}</strong>:
        <div><strong>Location:</strong> ${location}</div>
        <div><strong>Source:</strong> ${source}</div>
        <div><strong>Details:</strong> ${details}</div>
        <div class="actions">
            <button class="resolve-btn">Resolve</button>
            <button class="ignore-btn">Ignore</button>
        </div>
        <hr>
    `;
    logElement.insertBefore(entry, logElement.firstChild);

    // Add event listeners for resolve and ignore buttons
    const resolveBtn = entry.querySelector('.resolve-btn');
    resolveBtn.addEventListener('click', () => {
        resolveIncident(entry);
    });

    const ignoreBtn = entry.querySelector('.ignore-btn');
    ignoreBtn.addEventListener('click', () => {
        ignoreIncident(entry);
    });
}

// Function to simulate multiple breaches and add them to the log
function simulateBreaches() {
    const incidentData = [
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Server Room A',
            source: 'Workstation-123',
            details: 'Unauthorized access detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Firewall Gateway',
            source: 'Router-789',
            details: 'Security breach in firewall.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Database Server',
            source: 'Application Server-456',
            details: 'Data exfiltration attempt detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Network Storage',
            source: 'Backup Server-789',
            details: 'Unauthorized file access detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Admin Panel',
            source: 'Admin Workstation',
            details: 'Suspicious login attempt detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Email Server',
            source: 'Mail Client',
            details: 'Phishing email detected and blocked.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Web Application',
            source: 'Visitor Browser',
            details: 'SQL injection attempt detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Cloud Storage',
            source: 'Third-party Application',
            details: 'Unauthorized data upload detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'VPN Connection',
            source: 'Remote Device',
            details: 'Abnormal VPN traffic detected.'
        },
        { 
            timestamp: getCurrentTimestamp(),
            location: 'Authentication Server',
            source: 'Login Service',
            details: 'Multiple failed login attempts detected.'
        }
    ];

    // Display each simulated incident in the log
    incidentData.forEach(incident => {
        addLogEntry(incident.timestamp, incident.location, incident.source, incident.details);
    });
}

// Function to get current timestamp in YYYY-MM-DD HH:mm:ss format
function getCurrentTimestamp() {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
}

// Simulate breaches periodically (e.g., every 30 seconds)
simulateBreaches();
setInterval(simulateBreaches, 30000); // Update every 30 seconds (adjust as needed)

// Function to resolve an incident (simulated action)
function resolveIncident(entry) {
    entry.remove(); // Remove the incident log entry from the DOM

    // Display pop-up notification for resolution
    displayNotification('Incident Resolved', 'The incident has been resolved.');
}

// Function to ignore an incident (simulated action)
function ignoreIncident(entry) {
    entry.remove(); // Remove the incident log entry from the DOM

    // Display pop-up notification for ignoring
    displayNotification('Incident Ignored', 'The incident has been ignored.');
}

// Function to display a pop-up notification
function displayNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <button class="ok-btn">OK</button>
        </div>
    `;
    document.body.appendChild(notification);

    // Add event listener to OK button to dismiss notification
    const okBtn = notification.querySelector('.ok-btn');
    okBtn.addEventListener('click', () => {
        notification.remove(); // Remove the notification from the DOM
    });
}

});





