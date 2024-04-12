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
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.dash ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            switchSection(targetId);
        });
    });
});

// Function to run ledger (just for demonstration)
function runLedger() {
    const ledgerType = document.getElementById('ledgerType').value;
    alert(`Running ${ledgerType} ledger...`);
}



// document.addEventListener("DOMContentLoaded", function () {
//   // // Navigation functionality
//   // const navLinks = document.querySelectorAll('.users-navbar ul li a');
//   // navLinks.forEach(link => {
//   //     link.addEventListener('click', function(e) {
//   //         e.preventDefault();
//   //         const sectionId = this.getAttribute('href').substring(1);
//   //         showUsersSection(sectionId);
//   //     });
//   // });

//   // // Show/hide sections based on navigation click
//   // function showUsersSection(sectionId) {
//   //     const sections = document.querySelectorAll('.users-section');
//   //     sections.forEach(section => {
//   //         section.classList.remove('users-active');
//   //     });

//   //     const targetSection = document.getElementById('users-' + sectionId);
//   //     if (targetSection) {
//   //         targetSection.classList.add('users-active');
//   //     }
//   // }

//   // Form submission for data entry
//   const dataEntryForm = document.getElementById("users-dataEntryForm");
//   if (dataEntryForm) {
//     dataEntryForm.addEventListener("submit", function (e) {
//       e.preventDefault();
//       const transactionType = document.getElementById(
//         "users-transactionType"
//       ).value;
//       const amount = document.getElementById("users-amount").value;
//       // Handle form submission (e.g., send data to backend)
//       console.log("Transaction Type:", transactionType);
//       console.log("Amount:", amount);
//       // Reset form fields
//       dataEntryForm.reset();
//     });
//   }

//   // Run ledger based on selected type
//   window.runUsersLedger = function () {
//     const ledgerType = document.getElementById("users-ledgerType").value;
//     // Simulated ledger running (replace with actual logic)
//     console.log("Running ledger:", ledgerType);
//   };
// });

// // Event listener for tab navigation and content loading
// document.querySelectorAll(".dash ul li a").forEach((tabLink) => {
//   tabLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     const tabId = this.getAttribute("href").substring(1);
//     showUsersTab(tabId);
//   });

//   // // Function to display selected tab content
//   // function showUsersTab(tabId) {
//   //     const tabContents = document.querySelectorAll('.section-users');
//   //     tabContents.forEach(content => {
//   //         content.style.display = 'none';
//   //     });

//   //     const selectedTab = document.getElementById(tabId);
//   //     if (selectedTab) {
//   //         selectedTab.style.display = 'block';

//   //         if (tabId === 'dashboard-users') {
//   //             fetchDashboardUsers();
//   //         } else if (tabId === 'register-users') {
//   //             fetchRegisterUsers();
//   //         } else if (tabId === 'dataEntry-users') {
//   //             fetchDataEntryUsers();
//   //         } else if (tabId === 'budget-users') {
//   //             fetchBudgetUsers();
//   //         } else if (tabId === 'generalLedger-users') {
//   //             fetchGeneralLedgerUsers();
//   //         } else if (tabId === 'inventory-users') {
//   //             fetchInventoryUsers();
//   //         }
//   //         // } else if (tabId === 'graphical-reports') {
//   //         //     const selectedReportType = usersReportTypeSelect.value;
//   //         //     renderUsersGraphicalReport(selectedReportType);
//   //         // }
//   //     }
//   // }

//   // Function to initialize the default display
//   function initializeDefaultDisplay() {
//     const defaultSectionId = "dashboard-users";
//     navigateTo(defaultSectionId);
//   }

//   // Function to handle section navigation
//   function navigateTo(sectionId) {
//     // Hide all sections
//     const sections = document.querySelectorAll("section-users");
//     sections.forEach((section) => {
//       section.classList.remove("active");
//     });

//     // Show only the selected section
//     const selectedSection = document.getElementById(sectionId);
//     if (selectedSection) {
//       selectedSection.classList.add("active");
//     }
//   }

//   // Initialize the default display when the page finishes loading
//   window.onload = initializeDefaultDisplay;
// });

