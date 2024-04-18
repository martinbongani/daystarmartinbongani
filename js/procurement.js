document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const itemList = document.getElementById('itemList');
    const reportItemSelect = document.getElementById('reportItem');
    const resourceRequestsList = document.querySelector('#resourceRequests-PurchaseOrder');
    const currentDateElement = document.getElementById('currentDate-PurchaseOrder');
    const selectedItemsList = document.getElementById('selectedItems-PurchaseOrder');


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
            { type: 'Babies Assigned', count: 7 },
            { type: 'Babies Present', count: 5 },
            { type: 'Sick Babies', count: 3 },
            { type: 'Completed Tasks', count: 12 },
            { type: 'Pending Tasks', count: 4 },
            { type: 'Parent Complaints', count: 2 }

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
            'Checking in Babies',
            'Preparing Child Progress Reports',
            'Preparing Baby Feeding Schedules',
            'Baby Playtime Schedule',
            'Baby Bathing Schedule',
            'Baby Sleeping Schedule',
            'Checking out babies',
            'Following up on absent babies',
            'Following up on parent feedback'

        ];

        usersTasksContainer.innerHTML = ''; // Clear existing content

        mockTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-users');
            taskElement.textContent = task;
            usersTasksContainer.appendChild(taskElement);
        });
    }

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
            } 
        }
    }

    // Show default tab on page load
    const defaultTab = document.querySelector('.sidebar-users ul li a');
    if (defaultTab) {
        const defaultTabId = defaultTab.getAttribute('href').substring(1);
        showUsersTab(defaultTabId);
    } else {
        displayDefaultContent();
    }

// Procurement Stores
for (let i = 1; i <= 20; i++) {
    const description = `Item ${i}`;
    const unitOfMeasure = 'pcs';
    const itemId = `item_${i}`;

    // Create row for each item
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${description}</td>
        <td>${unitOfMeasure}</td>
        <td><input type="number" id="received_${itemId}" min="0" class="storesMgt"></td>
        <td><input type="number" id="issued_${itemId}" min="0" class="storesMgt"></td>
        <td id="balance_${itemId}" class="storesMgt">0</td>
        <td><button onclick="updateBalance('${itemId}')" class="storesMgt">Submit</button></td>
    `;

    // Append row to the table body
    itemList.appendChild(row);

    // Create option for the item in the report select
    const option = document.createElement('option');
    option.value = itemId;
    option.textContent = description;
    reportItemSelect.appendChild(option);
}

// Function to update balance for a specific item
function updateBalance(itemId) {
const receivedField = document.getElementById(`received_${itemId}`);
const issuedField = document.getElementById(`issued_${itemId}`);
const balanceField = document.getElementById(`balance_${itemId}`);

const received = parseInt(receivedField.value) || 0;
const issued = parseInt(issuedField.value) || 0;
const currentBalance = parseInt(balanceField.innerText) || 0;

if (received >= 0 && issued >= 0) {
    const availableBalance = currentBalance + received;
    
    if (issued <= availableBalance) {
        const newBalance = availableBalance - issued;
        balanceField.innerText = newBalance;

        // Clear received and issued fields after submission
        receivedField.value = '';
        issuedField.value = '';
    } else {
        alert(`Cannot issue more than available balance (${availableBalance}).`);
    }
} else {
    alert('Please enter valid quantities (non-negative numbers).');
}
}

// Function to generate and display a report based on selected period and item
function runReport() {
const fromDate = document.getElementById('fromDate').value;
const toDate = document.getElementById('toDate').value;
const selectedItem = document.getElementById('reportItem').value;

// Dummy data for report (replace with actual report generation logic)
const reportData = {
    itemName: selectedItem,
    period: `${fromDate} to ${toDate}`,
    entries: [
        { date: '2024-04-01', openingBalance: 0, received: 100, issued: 0, closingBalance: 100 },
        { date: '2024-04-02', openingBalance: 100, received: 50, issued: 20, closingBalance: 130 }
        // Add more entries as needed
    ]
};

// Generate report content
let reportContent = `<h2>Report for ${reportData.itemName} (${reportData.period})</h2>`;
reportContent += '<table>';
reportContent += '<tr><th>Date</th><th>Opening Balance</th><th>Received</th><th>Issued</th><th>Closing Balance</th></tr>';

reportData.entries.forEach(entry => {
    reportContent += `<tr>`;
    reportContent += `<td>${entry.date}</td>`;
    reportContent += `<td>${entry.openingBalance}</td>`;
    reportContent += `<td>${entry.received}</td>`;
    reportContent += `<td>${entry.issued}</td>`;
    reportContent += `<td>${entry.closingBalance}</td>`;
    reportContent += `</tr>`;
});

reportContent += '</table>';

// Display report in popup
const popupContent = document.querySelector('.popupContent.storesMgt');
popupContent.innerHTML = reportContent;

// Show the report popup
const reportPopup = document.querySelector('.reportPopup.storesMgt');
reportPopup.style.display = 'block';
}

// Function to dismiss the report popup
function dismissReport() {
const reportPopup = document.querySelector('.reportPopup.storesMgt');
reportPopup.style.display = 'none';
}

// Procurement Purchase Orders
let totalAmount = 0;

let currentDate = new Date().toLocaleDateString();
currentDateElement.textContent = currentDate;

const resourceRequests = [
    {
        id: 'RR001',
        items: [
            { name: 'Crayons', quantity: 3, amount: 3500, department: 'Art' },
            { name: 'Construction Paper', quantity: 2, amount: 2100, department: 'Art' }
        ]
    },
    {
        id: 'RR002',
        items: [
            { name: 'Play-Doh', quantity: 5, amount: 4500, department: 'Creative Play' }
        ]
    }
    // Add more resource requests as needed
];

resourceRequests.forEach(request => {
    const listItem = document.createElement('li');
    listItem.textContent = request.id;
    listItem.addEventListener('click', () => displayItems(request, listItem));
    resourceRequestsList.appendChild(listItem);
});

function displayItems(request, selectedListItem) {
    request.items.forEach(item => {
        const itemDetails = `${item.name} - Quantity: ${item.quantity}, Amount: UGX ${item.amount.toLocaleString()}, Department: ${item.department}`;
        const listItem = document.createElement('li');
        listItem.textContent = itemDetails;
        selectedItemsList.appendChild(listItem);

        totalAmount += item.amount;
    });

    const grandTotalElement = document.getElementById('grandTotal-PurchaseOrder');
    grandTotalElement.textContent = `Grand Total: UGX ${totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

    // Remove selected resource request from left panel
    resourceRequestsList.removeChild(selectedListItem);
}

const printButton = document.getElementById('printButton-PurchaseOrder');
printButton.addEventListener('click', () => {
    window.print();
});


});

