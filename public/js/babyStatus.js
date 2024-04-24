// Sitter Baby List
const babies = [
    { name: "Denis Mukalazi", number: "BN001/24", status: "absent", details: { age: "12 months", gender: "Male", enrolledDate: "2023-01-01", specialNeeds: "", remarks: "" } },
    { name: "Keren Karungi", number: "BN002/24", status: "absent", details: { age: "10 months", gender: "Female", enrolledDate: "2023-03-15", specialNeeds: "Allergic to nuts", remarks: "Quiet and shy" } },
    { name: "Crispus Bwambale", number: "BN003/24", status: "absent", details: { age: "9 months", gender: "Male", enrolledDate: "2023-06-10", specialNeeds: "Requires extra nap time", remarks: "Loves playing with blocks" } },
    { name: "Innocent Olupot", number: "BN004/24", status: "absent", details: { age: "11 months", gender: "Female", enrolledDate: "2023-02-20", specialNeeds: "", remarks: "Very active and playful" } },
    { name: "Evelyn Nabirye", number: "BN005/24", status: "absent", details: { age: "8 months", gender: "Male", enrolledDate: "2023-06-05", specialNeeds: "Needs gluten-free snacks", remarks: "Enjoys drawing" } },
    { name: "Alex Kigozi", number: "BN006/24", status: "absent", details: { age: "7 months", gender: "Female", enrolledDate: "2023-08-01", specialNeeds: "Lactose intolerant", remarks: "Loves storytelling" } },
    { name: "Pauline Kisakye", number: "BN007/24", status: "absent", details: { age: "10 months", gender: "Male", enrolledDate: "2023-04-10", specialNeeds: "Requires extra attention during meals", remarks: "Enthusiastic learner" } }
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

