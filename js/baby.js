document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const usersReportTypeSelect = document.getElementById('report-type-select');
    const usersGraphicalReportChart = document.getElementById('graphical-report-chart').getContext('2d');


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
            { type: 'Amount Due', amount: 'Shs 105,000' },
            { type: 'Days Present', count: 43 },
            { type: 'Appetite (Scale of 10)', count: 7 },
            { type: 'Social Habits (Scale of 10)', count: 8 },
            { type: 'Playtime', value: 'Very Active' },
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

// Event listener for report type selection
usersReportTypeSelect.addEventListener('change', function() {
const selectedReportType = this.value;
renderUsersGraphicalReport(selectedReportType);
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
        }
    }

    // Event listener for report type selection
    usersReportTypeSelect.addEventListener('change', function() {
        const selectedReportType = this.value;
        renderUsersGraphicalReport(selectedReportType);
    });

    // Show default tab on page load
    const defaultTab = document.querySelector('.sidebar-users ul li a');
    if (defaultTab) {
        const defaultTabId = defaultTab.getAttribute('href').substring(1);
        showUsersTab(defaultTabId);
    } else {
        displayDefaultContent();
    }


});

// Baby Financial Statement
const transactions = [
    { date: '2024-04-01', code: 'T001', description: 'Balance B/F', dr: '', cr: '50,000', balance: '50,000' },
    { date: '2024-04-05', code: 'T002', description: 'Payment: April Fees', dr: '', cr: '30,000', balance: '80,000' },
    { date: '2024-04-10', code: 'T003', description: 'Snack Purchase', dr: '5,000', cr: '', balance: '75,000' },
    { date: '2024-04-15', code: 'T004', description: 'Payment: May Fees', dr: '', cr: '30,000', balance: '105,000' },
    { date: '2024-04-20', code: 'T005', description: 'Payment: June Fees', dr: '', cr: '30,000', balance: '135,000' },
    { date: '2024-05-01', code: 'T006', description: 'Social Habits (Scale of 10)', dr: '2,000', cr: '', balance: '133,000' },
    { date: '2024-05-05', code: 'T007', description: 'Snack Purchase', dr: '4,000', cr: '', balance: '129,000' },
    { date: '2024-05-10', code: 'T008', description: 'Playtime', dr: '3,000', cr: '', balance: '126,000' },
    { date: '2024-05-15', code: 'T009', description: 'Payment: July Fees', dr: '', cr: '30,000', balance: '156,000' },
    { date: '2024-05-20', code: 'T010', description: 'Expenses', dr: '25,000', cr: '', balance: '131,000' },
    { date: '2024-06-01', code: 'T011', description: 'Payment: June Fees', dr: '', cr: '30,000', balance: '161,000' },
    { date: '2024-06-05', code: 'T012', description: 'Appetite (Scale of 10)', dr: '1,000', cr: '', balance: '160,000' },
    { date: '2024-06-10', code: 'T013', description: 'Payment: July Fees', dr: '', cr: '30,000', balance: '190,000' },
    { date: '2024-06-15', code: 'T014', description: 'Expenses', dr: '5,000', cr: '', balance: '185,000' },
    { date: '2024-06-20', code: 'T015', description: 'Payment: August Fees', dr: '', cr: '30,000', balance: '215,000' }
];

// Function to populate the transaction table
function populateTransactionTable(data) {
    const tbody = document.getElementById('transaction-body-babyFinStatement');
    tbody.innerHTML = ''; // Clear existing rows
    data.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td id="td-babyFinStatement">${transaction.date}</td>
            <td id="td-babyFinStatement">${transaction.code}</td>
            <td id="td-babyFinStatement">${transaction.description}</td>
            <td id="td-babyFinStatement">${transaction.dr}</td>
            <td id="td-babyFinStatement">${transaction.cr}</td>
            <td id="td-babyFinStatement">${transaction.balance}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to print the financial statement
function printStatement() {
    window.print();
}

// Function to export the financial statement to Excel (Basic version)
function exportToExcel() {
    const table = document.getElementById('table-babyFinStatement');
    const html = table.outerHTML;
    const url = 'data:application/vnd.ms-excel;base64,' + btoa(html);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'daystar_statement.xls';
    a.click();
}

// Populate the transaction table with default data on page load
window.onload = function() {
    populateTransactionTable(transactions);
};




