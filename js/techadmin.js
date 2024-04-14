document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const usersReportTypeSelect = document.getElementById('report-type-select');
    const usersGraphicalReportChart = document.getElementById('graphical-report-chart').getContext('2d');
    const form = document.getElementById('babyProfileForm');
    const popup = document.getElementById('babyProfilePopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const formStaffProfile = document.getElementById('formStaffProfile');
    const popupStaffProfile = document.getElementById('popupStaffProfile');
    const closePopupBtnStaffProfile = document.getElementById('closePopupBtnStaffProfile');


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
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const firstName = document.getElementById('babyProfileFirstName').value.trim();
        const lastName = document.getElementById('babyProfileLastName').value.trim();
        const otpMethod = document.querySelector('input[name="otpMethod"]:checked');

        if (!validateForm(firstName, lastName, otpMethod)) {
            return;
        }

        const username = generateUsername(firstName, lastName);
        const otp = generateOtp();

        const deliveryMethod = otpMethod.value;

        try {
            const message = `Username: ${username}\nOTP: ${otp}`;
            await sendDetails(username, otp, deliveryMethod);

            const deliveryType = deliveryMethod === 'email' ? 'Email' : 'SMS';
            const displayMessage = `Username and OTP sent via ${deliveryType}.`;
            displayPopup(displayMessage);

            clearForm(); // Clear the form after successful submission
        } catch (error) {
            console.error('Error sending details:', error);
            alert('An error occurred while sending details.');
        }
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });


function validateForm(firstName, lastName, otpMethod) {
    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorOtpMethod = document.getElementById('errorOtpMethod');

    errorFirstName.textContent = '';
    errorLastName.textContent = '';
    errorOtpMethod.textContent = '';

    let isValid = true;

    if (firstName === '') {
        errorFirstName.textContent = 'First name is required';
        isValid = false;
    }

    if (lastName === '') {
        errorLastName.textContent = 'Last name is required';
        isValid = false;
    }

    if (!otpMethod) {
        errorOtpMethod.textContent = 'Please select OTP delivery method';
        isValid = false;
    }

    return isValid;
}

function generateUsername(firstName, lastName) {
    const randomNum = Math.floor(Math.random() * 1000);
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${randomNum}`;
    return username;
}

function generateOtp() {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}

async function sendDetails(username, otp, deliveryMethod) {
    // Simulate sending details (replace with actual sending logic)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Sending details to ${deliveryMethod}...`);
            resolve();
        }, 2000); // Simulate 2 seconds delay for sending
    });
}

function displayPopup(message) {
    const popupContent = document.getElementById('babyProfileDetails');
    popupContent.textContent = message;
    const popup = document.getElementById('babyProfilePopup');
    popup.style.display = 'flex';
}

function clearForm() {
    const firstNameInput = document.getElementById('babyProfileFirstName');
    const lastNameInput = document.getElementById('babyProfileLastName');
    const otpMethods = document.querySelectorAll('input[name="otpMethod"]');

    firstNameInput.value = '';
    lastNameInput.value = '';

    otpMethods.forEach(method => {
        method.checked = false;
    });

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.textContent = '';
    });
}

// Accounts Budget
formStaffProfile.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstNameInputStaffProfile = document.getElementById('firstNameInputStaffProfile').value.trim();
    const lastNameInputStaffProfile = document.getElementById('lastNameInputStaffProfile').value.trim();
    const otpMethodInputStaffProfile = document.querySelector('input[name="otpMethodStaffProfile"]:checked');

    if (!validateFormStaffProfile(firstNameInputStaffProfile, lastNameInputStaffProfile, otpMethodInputStaffProfile)) {
        return;
    }

    const generatedUsernameStaffProfile = generateUsernameStaffProfile(firstNameInputStaffProfile, lastNameInputStaffProfile);
    const generatedOtpStaffProfile = generateOtpStaffProfile();

    const deliveryMethodStaffProfile = otpMethodInputStaffProfile.value;

    try {
        const message = `Username: ${generatedUsernameStaffProfile}\nOTP: ${generatedOtpStaffProfile}`;
        await sendDetailsStaffProfile(generatedUsernameStaffProfile, generatedOtpStaffProfile, deliveryMethodStaffProfile);

        const deliveryType = deliveryMethodStaffProfile === 'email' ? 'Email' : 'SMS';
        const displayMessage = `Username and OTP sent via ${deliveryType}.`;
        displayPopupStaffProfile(displayMessage);
        clearFormStaffProfile(); // Clear the form after submission
    } catch (error) {
        console.error('Error sending details:', error);
        alert('An error occurred while sending details.');
    }


closePopupBtnStaffProfile.addEventListener('click', () => {
    popupStaffProfile.style.display = 'none';
});
});

function validateFormStaffProfile(firstName, lastName, otpMethod) {
const errorFirstNameStaffProfile = document.getElementById('errorFirstNameStaffProfile');
const errorLastNameStaffProfile = document.getElementById('errorLastNameStaffProfile');
const errorOtpMethodStaffProfile = document.getElementById('errorOtpMethodStaffProfile');

errorFirstNameStaffProfile.textContent = '';
errorLastNameStaffProfile.textContent = '';
errorOtpMethodStaffProfile.textContent = '';

let isValid = true;

if (firstName === '') {
    errorFirstNameStaffProfile.textContent = 'First name is required';
    isValid = false;
}

if (lastName === '') {
    errorLastNameStaffProfile.textContent = 'Last name is required';
    isValid = false;
}

if (!otpMethod) {
    errorOtpMethodStaffProfile.textContent = 'Please select OTP delivery method';
    isValid = false;
}

return isValid;
}

function generateUsernameStaffProfile(firstName, lastName) {
const randomNumStaffProfile = Math.floor(Math.random() * 1000);
const usernameStaffProfile = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${randomNumStaffProfile}`;
return usernameStaffProfile;
}

function generateOtpStaffProfile() {
const otpStaffProfile = Math.floor(1000 + Math.random() * 9000);
return otpStaffProfile;
}

async function sendDetailsStaffProfile(username, otp, deliveryMethod) {
// Simulate sending details (replace with actual sending logic)
return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`Sending details to ${deliveryMethod}...`);
        resolve();
    }, 2000); // Simulate 2 seconds delay for sending
});
}

function displayPopupStaffProfile(message) {
const popupContentStaffProfile = document.getElementById('popupContentStaffProfile');
popupContentStaffProfile.innerHTML = `
    <p>${message}</p>
    <button id="okButtonStaffProfile" class="popup-close-btn-staffProfile">OK</button>
`;

const popupStaffProfile = document.getElementById('popupStaffProfile');
popupStaffProfile.style.display = 'flex';

// Add event listener to the "OK" button
const okButtonStaffProfile = document.getElementById('okButtonStaffProfile');
okButtonStaffProfile.addEventListener('click', () => {
    popupStaffProfile.style.display = 'none'; // Hide the popup
});
}

function clearFormStaffProfile() {
document.getElementById('firstNameInputStaffProfile').value = '';
document.getElementById('lastNameInputStaffProfile').value = '';
document.querySelector('input[name="otpMethodStaffProfile"]:checked').checked = false;
document.getElementById('errorFirstNameStaffProfile').textContent = '';
document.getElementById('errorLastNameStaffProfile').textContent = '';
document.getElementById('errorOtpMethodStaffProfile').textContent = '';
}

// // Sample budget data for departments
// const financeBudget = {
//     projected: 100000,
//     spent: 70000,
//     balance: 30000
// };

// const adminBudget = {
//     projected: 80000,
//     spent: 60000,
//     balance: 20000
// };

// const procurementBudget = {
//     projected: 120000,
//     spent: 90000,
//     balance: 30000
// };

// // Display finance department budget details
// document.getElementById('financeProjected').textContent = financeBudget.projected.toLocaleString();
// document.getElementById('financeSpent').textContent = financeBudget.spent.toLocaleString();
// document.getElementById('financeBalance').textContent = financeBudget.balance.toLocaleString();

// // Display administration department budget details
// document.getElementById('adminProjected').textContent = adminBudget.projected.toLocaleString();
// document.getElementById('adminSpent').textContent = adminBudget.spent.toLocaleString();
// document.getElementById('adminBalance').textContent = adminBudget.balance.toLocaleString();

// // Display procurement department budget details
// document.getElementById('procurementProjected').textContent = procurementBudget.projected.toLocaleString();
// document.getElementById('procurementSpent').textContent = procurementBudget.spent.toLocaleString();
// document.getElementById('procurementBalance').textContent = procurementBudget.balance.toLocaleString();

// // Calculate overall budget overview
// const totalProjected = financeBudget.projected + adminBudget.projected + procurementBudget.projected;
// const totalSpent = financeBudget.spent + adminBudget.spent + procurementBudget.spent;
// const totalBalance = financeBudget.balance + adminBudget.balance + procurementBudget.balance;

// // Display overall budget overview
// document.getElementById('totalProjected').textContent = totalProjected.toLocaleString();
// document.getElementById('totalSpent').textContent = totalSpent.toLocaleString();
// document.getElementById('totalBalance').textContent = totalBalance.toLocaleString();

// // Accounts Inventory
// let inventoryItems = [];

//     // Function to render inventory items
//     function renderInventory() {
//         inventoryList.innerHTML = '';
//         inventoryItems.forEach((item, index) => {
//             const itemElement = document.createElement('div');
//             itemElement.classList.add('list-item');
//             itemElement.innerHTML = `
//                 <strong>${item.name}</strong> - Quantity: ${item.quantity}
//                 <button onclick="updateItem(${index})">Update</button>
//                 <button onclick="deleteItem(${index})">Delete</button>
//             `;
//             inventoryList.appendChild(itemElement);
//         });
//     }

//     // Function to add a new item
//     addItemForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         // Validate form fields
//         const itemNameInput = document.getElementById('itemName');
//         const itemQuantityInput = document.getElementById('itemQuantity');

//         if (validateField(itemNameInput) && validateField(itemQuantityInput)) {
//             const itemName = itemNameInput.value;
//             const itemQuantity = parseInt(itemQuantityInput.value);

//             if (itemName && !isNaN(itemQuantity) && itemQuantity > 0) {
//                 const newItem = {
//                     name: itemName,
//                     quantity: itemQuantity
//                 };
//                 inventoryItems.push(newItem);
//                 renderInventory();
//                 addItemForm.reset();
//             } else {
//                 alert('Please provide a valid item name and quantity.');
//             }
//         } else {
//             alert('Please fill out all required fields.');
//         }
//     });

//     // Function to validate a form field
//     function validateField(input) {
//         if (input.value.trim() === '') {
//             input.classList.add('invalid');
//             return false;
//         } else {
//             input.classList.remove('invalid');
//             return true;
//         }
//     }

//     // Function to update an item
//     window.updateItem = (index) => {
//         const newQuantity = prompt(`Update quantity for ${inventoryItems[index].name}:`, inventoryItems[index].quantity);
//         const parsedQuantity = parseInt(newQuantity);
//         if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
//             inventoryItems[index].quantity = parsedQuantity;
//             renderInventory();
//         } else {
//             alert('Please provide a valid quantity.');
//         }
//     };

//     // Function to delete an item
//     window.deleteItem = (index) => {
//         if (confirm(`Are you sure you want to delete ${inventoryItems[index].name}?`)) {
//             inventoryItems.splice(index, 1);
//             renderInventory();
//         }
//     };

            
});





