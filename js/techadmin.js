document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const usersReportTypeSelect = document.getElementById('report-type-select');
    const usersGraphicalReportChart = document.getElementById('graphical-report-chart').getContext('2d');
    const form = document.getElementById('babyProfileForm');
    const firstNameInput = document.getElementById('firstNameBabyProfile');
    const lastNameInput = document.getElementById('lastNameBabyProfile');
    const emailInput = document.getElementById('email');

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
            { type: 'Pending Tasks', count: 33 },
            { type: 'Completed Tasks', count: 18 },
            { type: 'Users', count: 132 },
            { type: 'Active Users', count: 98 },
            { type: 'Attacks', count: 3 },
            { type: 'Zero Day Attacks', count: 1 },
            { type: 'System Updates', count: 7 }

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
            'System Updates',
            'Configurations',
            'User Profile Updates',
            'Debugging',
            'Firewall checks',
            'Registering Users'

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
                    label: 'System Performance',
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


    // Data User Profile
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();

        if (!firstName || !lastName || !email) {
            alert('Please fill out all fields.');
            return;
        }

        const username = generateUsername(firstName, lastName);
        const otp = generateOTP();

        sendProfileDetails(username, otp, email);

        // Reset form after submission
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';

        alert('Profile generated successfully!');
    });

    function generateUsername(firstName, lastName) {
        const randomNum = Math.floor(Math.random() * 1000);
        return firstName.toLowerCase() + lastName.toLowerCase() + randomNum;
    }

    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    }

    function sendProfileDetails(username, otp, email) {
        // Simulate sending email with username and OTP
        console.log(`Sending email to ${email} with username: ${username} and OTP: ${otp}`);
        // Here you can implement actual email sending logic
    }    
    // Accounts Budget
// Sample budget data for departments
const financeBudget = {
    projected: 100000,
    spent: 70000,
    balance: 30000
};

const adminBudget = {
    projected: 80000,
    spent: 60000,
    balance: 20000
};

const procurementBudget = {
    projected: 120000,
    spent: 90000,
    balance: 30000
};

// Display finance department budget details
document.getElementById('financeProjected').textContent = financeBudget.projected.toLocaleString();
document.getElementById('financeSpent').textContent = financeBudget.spent.toLocaleString();
document.getElementById('financeBalance').textContent = financeBudget.balance.toLocaleString();

// Display administration department budget details
document.getElementById('adminProjected').textContent = adminBudget.projected.toLocaleString();
document.getElementById('adminSpent').textContent = adminBudget.spent.toLocaleString();
document.getElementById('adminBalance').textContent = adminBudget.balance.toLocaleString();

// Display procurement department budget details
document.getElementById('procurementProjected').textContent = procurementBudget.projected.toLocaleString();
document.getElementById('procurementSpent').textContent = procurementBudget.spent.toLocaleString();
document.getElementById('procurementBalance').textContent = procurementBudget.balance.toLocaleString();

// Calculate overall budget overview
const totalProjected = financeBudget.projected + adminBudget.projected + procurementBudget.projected;
const totalSpent = financeBudget.spent + adminBudget.spent + procurementBudget.spent;
const totalBalance = financeBudget.balance + adminBudget.balance + procurementBudget.balance;

// Display overall budget overview
document.getElementById('totalProjected').textContent = totalProjected.toLocaleString();
document.getElementById('totalSpent').textContent = totalSpent.toLocaleString();
document.getElementById('totalBalance').textContent = totalBalance.toLocaleString();

// Accounts Inventory
let inventoryItems = [];

    // Function to render inventory items
    function renderInventory() {
        inventoryList.innerHTML = '';
        inventoryItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('list-item');
            itemElement.innerHTML = `
                <strong>${item.name}</strong> - Quantity: ${item.quantity}
                <button onclick="updateItem(${index})">Update</button>
                <button onclick="deleteItem(${index})">Delete</button>
            `;
            inventoryList.appendChild(itemElement);
        });
    }

    // Function to add a new item
    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validate form fields
        const itemNameInput = document.getElementById('itemName');
        const itemQuantityInput = document.getElementById('itemQuantity');

        if (validateField(itemNameInput) && validateField(itemQuantityInput)) {
            const itemName = itemNameInput.value;
            const itemQuantity = parseInt(itemQuantityInput.value);

            if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
                const newItem = {
                    name: itemName,
                    quantity: itemQuantity
                };
                inventoryItems.push(newItem);
                renderInventory();
                addItemForm.reset();
            } else {
                alert('Please provide a valid item name and quantity.');
            }
        } else {
            alert('Please fill out all required fields.');
        }
    });

    // Function to validate a form field
    function validateField(input) {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            return false;
        } else {
            input.classList.remove('invalid');
            return true;
        }
    }

    // Function to update an item
    window.updateItem = (index) => {
        const newQuantity = prompt(`Update quantity for ${inventoryItems[index].name}:`, inventoryItems[index].quantity);
        const parsedQuantity = parseInt(newQuantity);
        if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
            inventoryItems[index].quantity = parsedQuantity;
            renderInventory();
        } else {
            alert('Please provide a valid quantity.');
        }
    };

    // Function to delete an item
    window.deleteItem = (index) => {
        if (confirm(`Are you sure you want to delete ${inventoryItems[index].name}?`)) {
            inventoryItems.splice(index, 1);
            renderInventory();
        }
    };

            
});





