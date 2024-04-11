document.addEventListener('DOMContentLoaded', function() {
    // Get all dashboard links by their IDs
    const dashboardLink = document.getElementById('dashboard-link');
    const registerLink = document.getElementById('register-link');
    const dataEntryLink = document.getElementById('dataEntry-link');
    const budgetLink = document.getElementById('budget-link');
    const generalLedgerLink = document.getElementById('generalLedger-link');
    const inventoryLink = document.getElementById('inventory-link');
    
    // Function to handle navigation based on clicked link
    function navigateToSection(event, sectionId) {
        event.preventDefault(); // Prevent default link behavior
        
        const section = document.querySelector(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' }); // Scroll to section smoothly
        }
    }
    
    // Add event listeners to dashboard links
    dashboardLink.addEventListener('click', (event) => navigateToSection(event, '#dashboard'));
    registerLink.addEventListener('click', (event) => navigateToSection(event, '#register'));
    dataEntryLink.addEventListener('click', (event) => navigateToSection(event, '#dataEntry'));
    budgetLink.addEventListener('click', (event) => navigateToSection(event, '#budget'));
    generalLedgerLink.addEventListener('click', (event) => navigateToSection(event, '#generalLedger'));
    inventoryLink.addEventListener('click', (event) => navigateToSection(event, '#inventory'));
});