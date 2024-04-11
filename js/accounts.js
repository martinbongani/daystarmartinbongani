// Function to handle navigation
function navigateTo(page) {
    console.log("Navigating to: " + page);
    // Redirect to the specified page
    window.location.href = page;
}

// Function to toggle dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownMenu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
}

// Event listeners for navigation buttons
document.getElementById("accountsDashboard").addEventListener("click", function() {
    navigateTo('accounts.html');
});

document.getElementById("accountsRegister").addEventListener("click", function() {
    navigateTo('accounts-register.html');
});

document.getElementById("accountsDataEntry").addEventListener("click", function() {
    navigateTo('accounts-dataentry.html');
});

document.getElementById("accountsBudget").addEventListener("click", function() {
    navigateTo('accounts-budget.html');
});

document.getElementById("accountsGeneralLedger").addEventListener("click", function() {
    navigateTo('accounts-genledger.html');
});

document.getElementById("accountsInventory").addEventListener("click", function() {
    navigateTo('accounts-inventory.html');
});

// Event listener for dropdown toggle button
document.getElementById("dropdownToggle").addEventListener("click", toggleDropdown);
