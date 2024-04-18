document.addEventListener('DOMContentLoaded', function() {
    const usersRealtimeCardsContainer = document.getElementById('realtime-cards-container');
    const usersTasksContainer = document.getElementById('tasks-container');
    const calendarContainer = document.getElementById('calendar-sitter');
    const activityDetails = document.getElementById('activityDetails-sitterCalendar');
    const activityTitle = document.getElementById('activityTitle-sitterCalendar');
    const activityTime = document.getElementById('activityTime-sitterCalendar');
    const activityBabies = document.getElementById('activityBabies-sitterCalendar');
    const activityLocation = document.getElementById('activityLocation-sitterCalendar');
    const closeButton = document.getElementById('closeButton-sitterCalendar');


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

// Sitter Calendar
            // Complete schedule data
            const schedule = [
                { day: 'Monday', activities: [
                    { time: '09:00 AM', title: 'Morning playtime', babies: ['Emma', 'Liam'], location: 'Playroom A' },
                    { time: '11:30 AM', title: 'Nap time', babies: ['Olivia', 'Noah'], location: 'Nap Room' },
                    { time: '02:00 PM', title: 'Snack break', babies: ['Ava', 'William'], location: 'Dining Area' }
                ] },
                { day: 'Tuesday', activities: [
                    { time: '10:00 AM', title: 'Arts and crafts', babies: ['Sophia', 'James'], location: 'Art Room' },
                    { time: '12:00 PM', title: 'Lunch', babies: ['Isabella', 'Mason'], location: 'Dining Area' },
                    { time: '03:00 PM', title: 'Outdoor walk', babies: ['Evelyn', 'Elijah'], location: 'Backyard' }
                ] },
                { day: 'Wednesday', activities: [
                    { time: '09:30 AM', title: 'Morning playtime', babies: ['Harper', 'Benjamin'], location: 'Playroom B' },
                    { time: '12:00 PM', title: 'Music session', babies: ['Amelia', 'Oliver'], location: 'Music Room' },
                    { time: '03:30 PM', title: 'Nap time', babies: ['Charlotte', 'Jacob'], location: 'Nap Room' }
                ] },
                { day: 'Thursday', activities: [
                    { time: '08:45 AM', title: 'Breakfast', babies: ['Sophie', 'Logan', 'Aria'], location: 'Dining Area' },
                    { time: '11:00 AM', title: 'Indoor play', babies: ['Lucas', 'Avery'], location: 'Playroom C' },
                    { time: '02:30 PM', title: 'Story time', babies: ['Ella', 'Jackson'], location: 'Reading Corner' }
                ] },
                { day: 'Friday', activities: [
                    { time: '10:15 AM', title: 'Sensory activities', babies: ['Avery', 'Michael', 'Luna'], location: 'Sensory Room' },
                    { time: '12:30 PM', title: 'Lunch', babies: ['Scarlett', 'Jack'], location: 'Dining Area' },
                    { time: '03:15 PM', title: 'Outdoor play', babies: ['Lucy', 'Henry'], location: 'Playground' }
                ] },
                { day: 'Saturday', activities: [
                    { time: '09:00 AM', title: 'Day off' }
                ] },
                { day: 'Sunday', activities: [
                    { time: '09:00 AM', title: 'Day off' }
                ] }
            ];

            // Render the calendar
            schedule.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day-sitterCalendar');

                const dayHeader = document.createElement('div');
                dayHeader.classList.add('day-header-sitterCalendar');
                dayHeader.textContent = day.day;
                dayElement.appendChild(dayHeader);

                day.activities.forEach(activity => {
                    if (activity.title !== 'Day off') {
                        const activityElement = document.createElement('div');
                        activityElement.classList.add('activity-sitterCalendar');
                        activityElement.textContent = `${activity.title} - ${activity.time}`;
                        activityElement.addEventListener('click', () => showActivityDetails(activity));
                        dayElement.appendChild(activityElement);
                    }
                });

                calendarContainer.appendChild(dayElement);
            });

            // Function to display activity details
            function showActivityDetails(activity) {
                if (activity.title !== 'Day off') {
                    activityTitle.textContent = activity.title;
                    activityTime.textContent = activity.time;
                    activityBabies.textContent = activity.babies.join(', ');
                    activityLocation.textContent = activity.location;
                    activityDetails.style.display = 'block';
                }
            }

            // Close button functionality
            closeButton.addEventListener('click', function() {
                activityDetails.style.display = 'none';
            });


});

// Sitter Baby List
const babies = [
    { name: "Baby One", number: "B1001/24", status: "absent", details: { age: "12 months", gender: "Male", enrolledDate: "2023-01-01", specialNeeds: "", remarks: "" } },
    { name: "Baby Two", number: "B2001/24", status: "absent", details: { age: "10 months", gender: "Female", enrolledDate: "2023-03-15", specialNeeds: "Allergic to nuts", remarks: "Quiet and shy" } },
    { name: "Baby Three", number: "B3001/24", status: "absent", details: { age: "9 months", gender: "Male", enrolledDate: "2023-06-10", specialNeeds: "Requires extra nap time", remarks: "Loves playing with blocks" } },
    { name: "Baby Four", number: "B4001/24", status: "absent", details: { age: "11 months", gender: "Female", enrolledDate: "2023-02-20", specialNeeds: "", remarks: "Very active and playful" } },
    { name: "Baby Five", number: "B5001/24", status: "absent", details: { age: "8 months", gender: "Male", enrolledDate: "2023-06-05", specialNeeds: "Needs gluten-free snacks", remarks: "Enjoys drawing" } },
    { name: "Baby Six", number: "B6001/24", status: "absent", details: { age: "7 months", gender: "Female", enrolledDate: "2023-08-01", specialNeeds: "Lactose intolerant", remarks: "Loves storytelling" } },
    { name: "Baby Seven", number: "B7001/24", status: "absent", details: { age: "10 months", gender: "Male", enrolledDate: "2023-04-10", specialNeeds: "Requires extra attention during meals", remarks: "Enthusiastic learner" } }
];

const babyList = document.getElementById('baby-list-babyListSitter');
let currentBaby = null;

// Render baby list
function renderBabyList() {
    babyList.innerHTML = '';
    babies.forEach(baby => {
        const listItem = document.createElement('li');
        listItem.classList.add('li-babyListSitter');
        listItem.innerHTML = `
            <span onclick="showDetails('${baby.name}')">
                <strong>${baby.name}</strong> - ${baby.number}
            </span>
            <span class="status-babyListSitter">${baby.status}</span>
            <div class="action-buttons-babyListSitter">
                <button class="button-babyListSitter" onclick="showActionPopup('${baby.name}', 'in')" ${baby.status !== 'absent' ? 'disabled' : ''}>Check In</button>
                <button class="button-babyListSitter" onclick="showActionPopup('${baby.name}', 'out')" ${baby.status !== 'present' ? 'disabled' : ''}>Check Out</button>
            </div>
        `;
        babyList.appendChild(listItem);
    });
}

renderBabyList(); // Initial render

// Show baby details in popup
function showDetails(babyName) {
    const baby = babies.find(b => b.name === babyName);
    if (baby) {
        document.getElementById('details-popup-title-babyListSitter').textContent = `${baby.name} Details`;
        document.getElementById('details-age-babyListSitter').textContent = baby.details.age || 'N/A';
        document.getElementById('details-gender-babyListSitter').textContent = baby.details.gender || 'N/A';
        document.getElementById('details-enrolled-babyListSitter').textContent = baby.details.enrolledDate || 'N/A';
        document.getElementById('details-special-needs-babyListSitter').textContent = baby.details.specialNeeds || 'N/A';
        document.getElementById('details-remarks-babyListSitter').textContent = baby.details.remarks || 'N/A';

        displayPopup('details-popup-babyListSitter');
    }
}

// Show action popup (check-in or check-out)
function showActionPopup(babyName, action) {
    const baby = babies.find(b => b.name === babyName);
    if (!baby) return;

    const personNameInput = document.getElementById('personNameInput-babyListSitter');
    const commentsInput = document.getElementById('commentsInput-babyListSitter');
    personNameInput.placeholder = action === 'in' ? `Enter name bringing ${babyName}` : `Enter name taking ${babyName}`;
    personNameInput.value = '';
    commentsInput.value = '';

    displayPopup('action-popup-babyListSitter');
    currentBaby = { name: babyName, action };
}

// Handle check-in or check-out action
function handleAction() {
    const personNameInput = document.getElementById('personNameInput-babyListSitter').value.trim();
    if (!personNameInput) {
        alert('Please enter a valid name.');
        return;
    }

    const baby = babies.find(b => b.name === currentBaby.name);
    if (!baby) return;

    const actionLabel = currentBaby.action === 'in' ? 'checked in' : 'checked out';
    baby.status = currentBaby.action === 'in' ? 'present' : 'absent';

    // Update status in the baby list
    renderBabyList();

    alert(`${personNameInput} has ${actionLabel} ${currentBaby.name} at ${new Date().toLocaleString()}`);
    closePopup('action-popup-babyListSitter');
}

// Display popup by ID
function displayPopup(popupId) {
    closeAllPopups(); // Close all other popups before displaying new one
    document.getElementById(popupId).style.display = 'block';
    document.getElementById('popup-overlay-babyListSitter').style.display = 'flex';
}

// Close all popups
function closeAllPopups() {
    const popups = document.querySelectorAll('.popup-container-babyListSitter .popup-babyListSitter');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
    document.getElementById('popup-overlay-babyListSitter').style.display = 'none';
}

// Close specific popup by ID
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
    document.getElementById('popup-overlay-babyListSitter').style.display = 'none';
}

// Sitter Progress Report
const babyReportsData = [
    { name: 'Emma Johnson', babyNumber: 'Bn001/24', activities: [] },
    { name: 'Liam Smith', babyNumber: 'Bn002/24', activities: [] },
    { name: 'Olivia Williams', babyNumber: 'Bn003/24', activities: [] },
    { name: 'Noah Brown', babyNumber: 'Bn004/24', activities: [] },
    { name: 'Ava Jones', babyNumber: 'Bn005/24', activities: [] },
    { name: 'William Davis', babyNumber: 'Bn006/24', activities: [] },
    { name: 'Sophia Miller', babyNumber: 'Bn007/24', activities: [] }
];

// Function to initialize baby reports
function initializeBabyReports() {
    const babyReportsContainer = document.getElementById('babyReports-sitter');
    babyReportsContainer.innerHTML = ''; // Clear previous content

    babyReportsData.forEach((baby, index) => {
        const babyReportDiv = document.createElement('div');
        babyReportDiv.classList.add('baby-report-sitter');

        const babyNameHeader = document.createElement('h2');
        babyNameHeader.classList.add('baby-name-babyReportSitter');
        babyNameHeader.textContent = `${baby.name} (${baby.babyNumber})`;

        const addActivityBtn = document.createElement('button');
        addActivityBtn.classList.add('add-activity-btn-babyReportSitter');
        addActivityBtn.textContent = 'Add Activity';
        addActivityBtn.addEventListener('click', () => openActivityModal(index));

        const activitiesList = document.createElement('div');
        activitiesList.classList.add('activity-item-babyReportSitter');
        baby.activities.forEach((activity, idx) => {
            const activityItem = createActivityItem(activity);
            activitiesList.appendChild(activityItem);
        });

        babyReportDiv.appendChild(babyNameHeader);
        babyReportDiv.appendChild(addActivityBtn);
        babyReportDiv.appendChild(activitiesList);

        babyReportsContainer.appendChild(babyReportDiv);
    });
}

// Function to create an activity item element
function createActivityItem(activity) {
    const activityItem = document.createElement('div');
    activityItem.classList.add('activity-item-babyReportSitter');
    activityItem.innerHTML = `
        <div><strong>Activity:</strong> ${activity.activity}</div>
        <div><strong>Comments:</strong> ${activity.comments}</div>
    `;
    return activityItem;
}

// Function to open activity modal for adding or editing activity
function openActivityModal(index) {
    const modal = document.getElementById('activityModal-babyReportSitter');
    modal.style.display = 'block';
    document.getElementById('currentBabyIndex-babyReportSitter').value = index;
}

// Function to save new activity
function saveActivity() {
    const index = document.getElementById('currentBabyIndex-babyReportSitter').value;
    const activityInput = document.getElementById('activityInput-babyReportSitter').value.trim();
    const commentsInput = document.getElementById('commentsInput-babyReportSitter').value.trim();

    if (activityInput !== '') {
        babyReportsData[index].activities.push({ activity: activityInput, comments: commentsInput });
        closeModal();
        initializeBabyReports(); // Re-render reports after adding activity
    } else {
        alert('Please enter a valid activity.');
    }
}

// Function to cancel activity operation
function cancelActivity() {
    closeModal();
}

// Function to post the report to the database
function postReport() {
    const timestamp = new Date().toLocaleString();
    const index = document.getElementById('currentBabyIndex-babyReportSitter').value;
    const baby = babyReportsData[index];

    if (baby.activities.length > 0) {
        const reportContent = `
            ${baby.name} (${baby.babyNumber}) - ${timestamp}\n\n` +
            baby.activities.map(activity => `Activity: ${activity.activity}\nComments: ${activity.comments}\n\n`).join('');

        // Dummy implementation: Display report content and clear activities
        console.log(reportContent);
        baby.activities = [];
        initializeBabyReports(); // Re-render reports after clearing activities
    } else {
        alert('Cannot post an empty report.');
    }
}

// Function to close the activity modal
function closeModal() {
    const modal = document.getElementById('activityModal-babyReportSitter');
    modal.style.display = 'none';
    document.getElementById('activityInput-babyReportSitter').value = '';
    document.getElementById('commentsInput-babyReportSitter').value = '';
}

// Initialize baby reports on page load
initializeBabyReports();




