document.addEventListener('DOMContentLoaded', () => {
    const generateReportBtn = document.getElementById('generateReportstaffReportAdmin');
    const exportReportBtn = document.getElementById('exportReportstaffReportAdmin');
    const reportTableBody = document.getElementById('tbody-staffReportAdmin');

    let reportData = []; // Array to store report data

    // Simulated data for sitters staff
    const sittersStaff = [
        { fullName: 'Grace Martinez', staffNumber: 'SN001/24', status: 'Present' },
        { fullName: 'Lucas Young', staffNumber: 'SN002/24', status: 'Present' },
        { fullName: 'Mia Robinson', staffNumber: 'SN003/24', status: 'Absent' },
        { fullName: 'Benjamin King', staffNumber: 'SN004/24', status: 'Present' },
        { fullName: 'Lily Wright', staffNumber: 'SN005/24', status: 'Present' },
        { fullName: 'Alexander Hill', staffNumber: 'SN006/24', status: 'Absent' },
        { fullName: 'Chloe Scott', staffNumber: 'SN007/24', status: 'Present' },
        { fullName: 'William Adams', staffNumber: 'SN008/24', status: 'Present' },
        { fullName: 'Victoria Baker', staffNumber: 'SN009/24', status: 'Present' },
        { fullName: 'Ethan Carter', staffNumber: 'SN010/24', status: 'Present' }
    ];

    generateReportBtn.addEventListener('click', () => {
        const fromDate = document.getElementById('fromDatestaffReportAdmin').value;
        const toDate = document.getElementById('toDatestaffReportAdmin').value;

        if (!fromDate || !toDate) {
            alert('Please select both "From" and "To" dates.');
            return;
        }

        // Assign sitters staff data
        reportData = sittersStaff;

        // Clear previous table rows
        reportTableBody.innerHTML = '';

        // Populate table with sitters staff data
        reportData.forEach(staff => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${staff.fullName}</td>
                <td>${staff.staffNumber}</td>
                <td>${staff.status}</td>
            `;
            reportTableBody.appendChild(row);
        });

        // Enable export button
        exportReportBtn.disabled = false;
    });

    exportReportBtn.addEventListener('click', () => {
        if (reportData.length === 0) {
            alert('Please generate a report before exporting.');
            return;
        }

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Name,Staff Number,Status\n';

        reportData.forEach(staff => {
            const csvRow = `${staff.fullName},${staff.staffNumber},${staff.status}\n`;
            csvContent += csvRow;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'daycare_report.csv');
        document.body.appendChild(link);
        link.click();
    });

    reportTableBody.addEventListener('click', (event) => {
        const targetRow = event.target.closest('tr');
        if (!targetRow || targetRow === reportTableBody.firstElementChild) return;

        const staffName = targetRow.cells[0].textContent;
        const checkInTime = ''; // Retrieve from biometric system
        const babiesUnderCare = ''; // Retrieve for sitters

        document.getElementById('staffName-staffReportAdmin').textContent = staffName;
        document.getElementById('checkInTime-staffReportAdmin').textContent = `Checked in at: ${checkInTime}`;
        document.getElementById('babiesUnderCare-staffReportAdmin').textContent = `Babies under care: ${babiesUnderCare}`;

        const modal = document.getElementById('modal-staffReportAdmin');
        modal.style.display = 'block';

        modal.querySelector('.close-staffReportAdmin').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
