document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const usersReportTypeSelect = document.getElementById('report-type-select');
    const usersGraphicalReportChart = document.getElementById('graphical-report-chart').getContext('2d');
    const form = document.getElementById('dataEntryForm-users');
    const ledgerAllocationSelect = document.getElementById('ledgerAllocation');
    const generalLedgerSection = document.getElementById('generalLedgerSection');
    const transactionDisplay = document.getElementById('transactionDisplay');
    const inventoryList = document.getElementById('inventoryList-users');
    const addItemForm = document.getElementById('addItemForm');

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
            { type: 'Pending Tasks', count: 5 },
            { type: 'Completed Tasks', count: 12 },
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
            'Prepare monthly financial report',
            'Review budget allocations',
            'Follow up with vendors',
            'Generate payroll',
            'Update inventory records'
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
                    label: 'Financial Data',
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


    // Data Entry
 // Event listener for changes in ledger allocation selection
 ledgerAllocationSelect.addEventListener('change', () => {
    const selectedAllocation = ledgerAllocationSelect.value;

    // Update the general ledger section based on the selected allocation
    updateGeneralLedgerSection(selectedAllocation);
});

// Function to update the general ledger section based on the selected allocation
function updateGeneralLedgerSection(allocation) {
    let ledgerDetails = '';

    switch (allocation) {
        case 'Allocation A':
            ledgerDetails = `
                <h2>General Ledger Details for Allocation A</h2>
                <p>Details specific to Allocation A...</p>
            `;
            break;
        case 'Allocation B':
            ledgerDetails = `
                <h2>General Ledger Details for Allocation B</h2>
                <p>Details specific to Allocation B...</p>
            `;
            break;
        case 'Allocation C':
            ledgerDetails = `
                <h2>General Ledger Details for Allocation C</h2>
                <p>Details specific to Allocation C...</p>
            `;
            break;
        default:
            // Clear the section if no allocation is selected
            generalLedgerSection.innerHTML = '';
            return;
    }

    // Display the ledger details in the general ledger section
    generalLedgerSection.innerHTML = ledgerDetails;
}

// Function to handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (validateForm()) {
        const formData = new FormData(form);
        const transactionData = {};

        formData.forEach((value, key) => {
            transactionData[key] = value;
        });

        try {
            // Simulate processing the transaction (replace with actual processing logic)
            const processedTransaction = await processTransaction(transactionData);

            // Clear form inputs after successful submission
            form.reset();

            // Display the submitted transaction details in a popup
            displayTransaction(processedTransaction);
        } catch (error) {
            console.error('Error processing transaction:', error);
            alert('An error occurred while submitting the transaction.');
        }
    } else {
        alert('Please fill out all required fields before submitting.');
    }
});

// Function to validate the form fields
function validateForm() {
    const requiredFields = ['date', 'description', 'costCenter', 'amount', 'transactionType', 'ledgerAllocation'];
    let isValid = true;

    requiredFields.forEach((fieldName) => {
        const fieldValue = form.elements[fieldName].value.trim();

        if (!fieldValue) {
            isValid = false;
        }
    });

    return isValid;
}

// Simulated function to process the transaction (replace with actual backend logic)
function processTransaction(transactionData) {
    return new Promise((resolve, reject) => {
        // Simulate processing time (1 second delay)
        setTimeout(() => {
            // Simulate response (processed transaction)
            const processedTransaction = {
                ...transactionData,
                status: 'processed',
                timestamp: new Date().toISOString()
            };
            resolve(processedTransaction);
        }, 1000); // Simulate 1 second processing delay
    });
}

// Function to display the transaction details in a popup
function displayTransaction(transaction) {
    const transactionDetails = `
        <div class="transaction-details">
            <h2>Transaction Details</h2>
            <p><strong>Date:</strong> ${transaction.date}</p>
            <p><strong>Description:</strong> ${transaction.description}</p>
            <p><strong>Cost Center:</strong> ${transaction.costCenter}</p>
            <p><strong>Amount:</strong> ${transaction.amount}</p>
            <p><strong>Transaction Type:</strong> ${transaction.transactionType}</p>
            <p><strong>Ledger Allocation:</strong> ${transaction.ledgerAllocation}</p>
            <p><strong>Status:</strong> ${transaction.status}</p>
            <p><strong>Timestamp:</strong> ${formatTimestamp(transaction.timestamp)}</p>
            <button id="dismissButton">Okay</button>
        </div>
    `;

    // Display the transaction details popup
    transactionDisplay.innerHTML = transactionDetails;

    // Attach event listener to the "Okay" button for dismissing the popup
    const dismissButton = document.getElementById('dismissButton');
    dismissButton.addEventListener('click', () => {
        transactionDisplay.innerHTML = ''; // Clear transaction details popup
    });
}

// Function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
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


    // Accounts Resgister
// Static data for different reports with dates
// const reportData = {
//     suppliers: [
//         { name: 'Supplier A', type: 'Product Supplier', balance: 1500, date: '2023-03-15' },
//         { name: 'Supplier B', type: 'Service Provider', balance: 2000, date: '2023-04-20' }
//     ],
//     tradeDebtors: [
//         { name: 'Customer X', type: 'Regular Customer', balance: -500, date: '2023-03-10' },
//         { name: 'Customer Y', type: 'Corporate Client', balance: -1000, date: '2023-04-05' }
//     ],
//     tradeCreditors: [
//         { name: 'Vendor 1', type: 'Material Supplier', balance: 3000, date: '2023-03-25' },
//         { name: 'Vendor 2', type: 'Equipment Provider', balance: 2500, date: '2023-04-10' }
//     ],
//     assets: [
//         { name: 'Equipment A', type: 'Machinery', value: 50000, date: '2023-03-01' },
//         { name: 'Inventory', type: 'Stock Items', value: 20000, date: '2023-04-01' }
//     ],
//     babyList: [
//         { name: 'Baby Product A', type: 'Diapers', quantity: 100, date: '2023-03-20' },
//         { name: 'Baby Product B', type: 'Toys', quantity: 50, date: '2023-04-15' }
//     ],
//     staffList: [
//         { name: 'Employee 1', position: 'Manager', date: '2023-03-05' },
//         { name: 'Employee 2', position: 'Sales Associate', date: '2023-04-02' }
//     ],
//     payroll: [
//         { name: 'Employee 1', salary: 5000, date: '2023-03-15' },
//         { name: 'Employee 2', salary: 4000, date: '2023-04-01' }
//     ]
// };

// let reportItemList = []; // Array to hold report line items

// // Function to run the report based on selected criteria
// function runReport() {
//     const reportType = document.getElementById('reportType').value;
//     const startDateInput = document.getElementById('startDate').value;
//     const endDateInput = document.getElementById('endDate').value;

//     // Validate report type selection
//     if (!reportType) {
//         alert('Please select a report type.');
//         return;
//     }

//     // Validate start date and end date inputs
//     const startDate = new Date(startDateInput);
//     const endDate = new Date(endDateInput);

//     if (!isValidDate(startDate) || !isValidDate(endDate)) {
//         alert('Please select valid start and end dates.');
//         return;
//     }

//     const selectedReport = reportData[reportType];
//     if (selectedReport) {
//         reportItemList = selectedReport.filter(item => {
//             const itemDate = new Date(item.date);
//             return itemDate >= startDate && itemDate <= endDate;
//         }).map(item => formatReportItem(item));

//         displayReport(); // Display filtered report items
//     } else {
//         alert('No data available for selected report type.');
//     }
// }

// // Function to check if a date is valid
// function isValidDate(date) {
//     return date instanceof Date && !isNaN(date);
// }

// // Function to format report item based on report type
// function formatReportItem(item) {
//     switch (document.getElementById('reportType').value) {
//         case 'suppliers':
//         case 'tradeDebtors':
//         case 'tradeCreditors':
//             return `${item.name} (${item.type}) - Balance: $${item.balance}`;
//         case 'assets':
//             return `${item.name} (${item.type}) - Value: $${item.value}`;
//         case 'babyList':
//             return `${item.name} (${item.type}) - Quantity: ${item.quantity}`;
//         case 'staffList':
//             return `${item.name} - Position: ${item.position}`;
//         case 'payroll':
//             return `${item.name} - Salary: $${item.salary}`;
//         default:
//             return 'Invalid report type.';
//     }
// }

// // Function to display the report items in the HTML
// function displayReport() {
//     const reportOutput = document.getElementById('reportOutput');
//     reportOutput.innerHTML = ''; // Clear existing report output

//     const reportItemListElement = document.createElement('ul');

//     reportItemList.forEach(itemText => {
//         const listItem = document.createElement('li');
//         listItem.textContent = itemText;
//         reportItemListElement.appendChild(listItem);
//     });

//     reportOutput.appendChild(reportItemListElement);

//     // Add "Add Line Item" button for dynamic interaction
//     const addLineItemButton = document.createElement('button');
//     addLineItemButton.textContent = 'Add Line Item';
//     addLineItemButton.onclick = addReportItem;
//     reportOutput.appendChild(addLineItemButton);
// }

// // Function to add a new line item to the report
// function addReportItem() {
//     const newItemDescription = prompt('Enter new item description:');
//     if (newItemDescription) {
//         reportItemList.push(newItemDescription);
//         displayReport(); // Update report display
//     }
// }

// // Event listener to run the report when the form is submitted
// const reportForm = document.getElementById('reportForm');
// reportForm.addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission
//     runReport(); // Run the report based on form inputs
// });
            
});





