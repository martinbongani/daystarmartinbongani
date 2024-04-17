document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');

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


    // IT Baby Profile
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

// IT Staff Profile
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





