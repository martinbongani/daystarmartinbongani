document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.users-navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showUsersSection(sectionId);
        });
    });

    // Show/hide sections based on navigation click
    function showUsersSection(sectionId) {
        const sections = document.querySelectorAll('.users-section');
        sections.forEach(section => {
            section.classList.remove('users-active');
        });

        const targetSection = document.getElementById('users-' + sectionId);
        if (targetSection) {
            targetSection.classList.add('users-active');
        }
    }

    // Form submission for data entry
    const dataEntryForm = document.getElementById('users-dataEntryForm');
    if (dataEntryForm) {
        dataEntryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const transactionType = document.getElementById('users-transactionType').value;
            const amount = document.getElementById('users-amount').value;
            // Handle form submission (e.g., send data to backend)
            console.log('Transaction Type:', transactionType);
            console.log('Amount:', amount);
            // Reset form fields
            dataEntryForm.reset();
        });
    }

    // Run ledger based on selected type
    window.runUsersLedger = function() {
        const ledgerType = document.getElementById('users-ledgerType').value;
        // Simulated ledger running (replace with actual logic)
        console.log('Running ledger:', ledgerType);
    };
});
