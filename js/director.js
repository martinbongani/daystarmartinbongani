// Dummy data for demonstration
const applicationsData = [
    { name: 'Baby 1', age: '6 months', status: 'Pending' },
    { name: 'Baby 2', age: '8 months', status: 'Approved' },
    { name: 'Baby 3', age: '10 months', status: 'Pending' }
  ];
  
  const financialData = [
    { month: 'January', revenue: 5000 },
    { month: 'February', revenue: 6000 },
    { month: 'March', revenue: 5500 }
  ];
  
  const programsData = [
    { name: 'Art Class', time: '9:00 AM', day: 'Monday' },
    { name: 'Music Class', time: '10:00 AM', day: 'Tuesday' },
    { name: 'Story Time', time: '11:00 AM', day: 'Wednesday' }
  ];
  
  // Function to display applications
  function displayApplications() {
    const applicationsContainer = document.getElementById('applications');
    applicationsContainer.innerHTML = '<h2>Applications from Babies</h2>';
    applicationsData.forEach(app => {
      applicationsContainer.innerHTML += `
        <div>
          <p>Name: ${app.name}</p>
          <p>Age: ${app.age}</p>
          <p>Status: ${app.status}</p>
        </div>
      `;
    });
  }
  
  // Function to display financial records
  function displayFinancialRecords() {
    const financialContainer = document.getElementById('financial');
    financialContainer.innerHTML = '<h2>Financial Records</h2>';
    financialContainer.innerHTML += '<ul>';
    financialData.forEach(data => {
      financialContainer.innerHTML += `<li>${data.month}: $${data.revenue}</li>`;
    });
    financialContainer.innerHTML += '</ul>';
  }
  
  // Function to display programs
  function displayPrograms() {
    const programsContainer = document.getElementById('programs');
    programsContainer.innerHTML = '<h2>Programs at the Center</h2>';
    programsContainer.innerHTML += '<ul>';
    programsData.forEach(program => {
      programsContainer.innerHTML += `<li>${program.name} - ${program.time} (${program.day})</li>`;
    });
    programsContainer.innerHTML += '</ul>';
  }
  
  // Function to display announcements and updates
  function displayDashboard() {
    const dashboardContainer = document.getElementById('dashboard');
    dashboardContainer.innerHTML = '<h2>Dashboard for Announcements and Updates</h2>';
    // You can populate dashboard content here
  }
  
  // Call functions to display initial data
  displayApplications();
  displayFinancialRecords();
  displayPrograms();
  displayDashboard();
  