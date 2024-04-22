document.getElementById('reportFormBabyAdmin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get selected period
    const fromDate = document.getElementById('fromDateBabyReportAdmin').value;
    const toDate = document.getElementById('toDateBabyReportAdmin').value;
    
    // Validate period selection
    if (!fromDate || !toDate) {
        alert('Please select both "From" and "To" dates to generate the report.');
        return;
    }
    
    // Simulated data (20 babies for demonstration)
    const babies = [
        { fullName: 'Alice Johnson', babyNumber: 'BN001/24', status: 'Present', sitter: 'Jane Doe' },
        { fullName: 'Benjamin Smith', babyNumber: 'BN002/24', status: 'Absent', sitter: 'John Smith' },
        { fullName: 'Caroline Brown', babyNumber: 'BN003/24', status: 'Present', sitter: 'Michael Brown' },
        // Add more baby data here...
    ];
    
    // Display babies in the enrollment table
    const enrollmentList = document.getElementById('enrollmentListBabyReportAdmin');
    enrollmentList.innerHTML = ''; // Clear previous table rows
    
    babies.forEach(baby => {
        const row = document.createElement('tr');
        
        // Create table cells for each baby detail
        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = baby.fullName;
        row.appendChild(fullNameCell);
        
        const babyNumberCell = document.createElement('td');
        babyNumberCell.textContent = baby.babyNumber;
        row.appendChild(babyNumberCell);
        
        const statusCell = document.createElement('td');
        statusCell.textContent = baby.status || 'N/A';
        row.appendChild(statusCell);
        
        const sitterCell = document.createElement('td');
        sitterCell.textContent = baby.sitter || 'N/A';
        row.appendChild(sitterCell);
        
        // Append the row to the table body
        enrollmentList.appendChild(row);
    });
    
    // Enable export button
    document.getElementById('exportButtonBabyReportAdmin').disabled = false;
});

document.getElementById('exportButtonBabyReportAdmin').addEventListener('click', function() {
    // Check if report has been generated
    const enrollmentTable = document.getElementById('enrollmentTableBabyReportAdmin');
    if (enrollmentTable.rows.length <= 1) {
        alert('Please generate a report before exporting.');
        return;
    }
    
    // Create CSV content from table data
    const rows = enrollmentTable.querySelectorAll('tr');
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    rows.forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            rowData.push(`"${cell.textContent}"`);
        });
        csvContent += rowData.join(',') + '\n';
    });
    
    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'baby_report.csv');
    document.body.appendChild(link);
    link.click();
});

// Disable export button initially
document.getElementById('exportButtonBabyReportAdmin').disabled = true;
