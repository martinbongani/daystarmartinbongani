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

// Admin Baby Report
document.getElementById('reportFormBabyAdmin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get selected period
    const fromDate = document.getElementById('fromDateBabyReportAdmin').value;
    const toDate = document.getElementById('toDateBabyReportAdmin').value;
    
    // Validate period selection
    if (!fromDate || !toDate) {
        alert('Please select both "From" and "To" dates to generate the report.');
        return;
    }
    
    // Simulated data (20 babies for demonstration)
    const babies = [
        { fullName: 'Alice Johnson', babyNumber: 'Bn001/24', dateEnrolled: '2024-04-01', status: 'Present', room: 'Infants', sitter: 'Jane Doe', remarks: '' },
        { fullName: 'Benjamin Smith', babyNumber: 'Bn002/24', dateEnrolled: '2024-03-15', status: 'Absent', remarks: 'Allergic to dairy products' },
        { fullName: 'Caroline Brown', babyNumber: 'Bn003/24', dateEnrolled: '2024-04-05', status: 'Present', room: 'Toddlers', sitter: 'John Smith', remarks: '' },
        { fullName: 'Daniel White', babyNumber: 'Bn004/24', dateEnrolled: '2024-03-20', status: 'Present', room: 'Infants', sitter: 'Emily Johnson', remarks: '' },
        { fullName: 'Ella Davis', babyNumber: 'Bn005/24', dateEnrolled: '2024-04-10', status: 'Absent', remarks: '' },
        { fullName: 'Franklin Moore', babyNumber: 'Bn006/24', dateEnrolled: '2024-03-25', status: 'Present', room: 'Toddlers', sitter: 'Sarah Adams', remarks: '' },
        { fullName: 'Grace Clark', babyNumber: 'Bn007/24', dateEnrolled: '2024-04-02', status: 'Present', room: 'Infants', sitter: 'Michael Brown', remarks: '' },
        { fullName: 'Henry Lee', babyNumber: 'Bn008/24', dateEnrolled: '2024-03-18', status: 'Absent', remarks: 'Feeling unwell' },
        { fullName: 'Isabella Garcia', babyNumber: 'Bn009/24', dateEnrolled: '2024-04-08', status: 'Present', room: 'Toddlers', sitter: 'Olivia Wilson', remarks: '' },
        { fullName: 'Jack Martinez', babyNumber: 'Bn010/24', dateEnrolled: '2024-03-22', status: 'Present', room: 'Infants', sitter: 'David Thompson', remarks: '' },
        { fullName: 'Katherine Adams', babyNumber: 'Bn011/24', dateEnrolled: '2024-04-03', status: 'Absent', remarks: '' },
        { fullName: 'Liam Johnson', babyNumber: 'Bn012/24', dateEnrolled: '2024-03-27', status: 'Present', room: 'Toddlers', sitter: 'Emma Brown', remarks: '' },
        { fullName: 'Mia Wilson', babyNumber: 'Bn013/24', dateEnrolled: '2024-04-06', status: 'Present', room: 'Infants', sitter: 'Noah Martinez', remarks: '' },
        { fullName: 'Nathan Taylor', babyNumber: 'Bn014/24', dateEnrolled: '2024-03-19', status: 'Absent', remarks: 'Family vacation' },
        { fullName: 'Olivia Moore', babyNumber: 'Bn015/24', dateEnrolled: '2024-04-04', status: 'Present', room: 'Toddlers', sitter: 'Ethan Wilson', remarks: '' },
        { fullName: 'Peter Brown', babyNumber: 'Bn016/24', dateEnrolled: '2024-03-24', status: 'Present', room: 'Infants', sitter: 'Sophia Adams', remarks: '' },
        { fullName: 'Quinn Anderson', babyNumber: 'Bn017/24', dateEnrolled: '2024-04-07', status: 'Present', room: 'Toddlers', sitter: 'Lucas Clark', remarks: '' },
        { fullName: 'Rachel Garcia', babyNumber: 'Bn018/24', dateEnrolled: '2024-03-21', status: 'Absent', remarks: 'Doctor appointment' },
        { fullName: 'Samuel Thompson', babyNumber: 'Bn019/24', dateEnrolled: '2024-04-09', status: 'Present', room: 'Infants', sitter: 'Chloe Lee', remarks: '' },
        { fullName: 'Taylor Martinez', babyNumber: 'Bn020/24', dateEnrolled: '2024-03-23', status: 'Present', room: 'Toddlers', sitter: 'Lily Johnson', remarks: '' }
    ];
    
    // Display babies in the enrollment table
    const enrollmentList = document.getElementById('enrollmentListBabyReportAdmin');
    enrollmentList.innerHTML = ''; // Clear previous table rows
    
    babies.forEach(baby => {
        const row = document.createElement('tr');
        
        // Create table cells for each baby detail
        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = baby.fullName;
        row.appendChild(fullNameCell);
        
        const babyNumberCell = document.createElement('td');
        babyNumberCell.textContent = baby.babyNumber;
        row.appendChild(babyNumberCell);
        
        const dateEnrolledCell = document.createElement('td');
        dateEnrolledCell.textContent = baby.dateEnrolled;
        row.appendChild(dateEnrolledCell);
        
        const statusCell = document.createElement('td');
        statusCell.textContent = baby.status || 'N/A';
        row.appendChild(statusCell);
        
        const roomCell = document.createElement('td');
        roomCell.textContent = baby.room || 'N/A';
        row.appendChild(roomCell);
        
        const sitterCell = document.createElement('td');
        sitterCell.textContent = baby.sitter || 'N/A';
        row.appendChild(sitterCell);
        
        const remarksCell = document.createElement('td');
        remarksCell.textContent = baby.remarks || 'N/A';
        row.appendChild(remarksCell);
        
        // Append the row to the table body
        enrollmentList.appendChild(row);
    });
    
    // Enable export button
    document.getElementById('exportButtonBabyReportAdmin').disabled = false;
});

document.getElementById('exportButtonBabyReportAdmin').addEventListener('click', function() {
    // Check if report has been generated
    const enrollmentTable = document.getElementById('enrollmentTableBabyReportAdmin');
    if (enrollmentTable.rows.length <= 1) {
        alert('Please generate a report before exporting.');
        return;
    }
    
    // Create CSV content from table data
    const rows = enrollmentTable.querySelectorAll('tr');
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            rowData.push(`"${cell.textContent}"`);
        });
        csvContent += rowData.join(',') + '\n';
    });
    
    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'enrollment_report.csv');
    document.body.appendChild(link);
    link.click();
});

// Disable export button initially
document.getElementById('exportButtonBabyReportAdmin').disabled = true;

});





