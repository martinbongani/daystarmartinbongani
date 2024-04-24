document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById(
      "realtime-cards-container"
    );

    // Simulated real-time updates data
    const updatesData = [
      { type: 'Total Revenue', count: 'Shs 55,356,000' },
      { type: 'Expenses', count: 'Shs 29,635,500' },
      { type: "Babies Enrolled", count: 165 },
      { type: "Babies Present", count: 153 },
      { type: "Sitters Enrolled", count: 65 },
      { type: "Sitters Present", count: 56 },
    ];

    // Display real-time updates cards
    updatesData.forEach((update) => {
      const card = document.createElement("div");
      card.classList.add("card-toDo");
      card.innerHTML = `
                <h3>${update.type}</h3>
                <p>${update.count}</p>
            `;
      cardsContainer.appendChild(card);
    });

  });

  document.addEventListener('DOMContentLoaded', function() {
        const chartCanvas = document.getElementById('graphical-report-chart');
        const reportTypeSelect = document.getElementById('report-type-select');

        let chartInstance = null;

        function renderGraph() {
            const reportType = reportTypeSelect.value;
            let labels, data, backgroundColor;

            switch (reportType) {
                case 'bar':
                    labels = ['January', 'February', 'March', 'April', 'May'];
                    data = [65, 59, 80, 81, 56];
                    backgroundColor = 'rgba(54, 162, 235, 0.5)';
                    break;
                case 'line':
                    labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
                    data = [12, 19, 3, 5, 2, 3];
                    backgroundColor = 'rgba(255, 206, 86, 0.5)';
                    break;
                case 'pie':
                    labels = ['Red', 'Blue', 'Yellow'];
                    data = [30, 20, 50];
                    backgroundColor = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)'];
                    break;
                default:
                    return;
            }

            if (chartInstance) {
                chartInstance.destroy();
            }

            chartInstance = new Chart(chartCanvas, {
                type: reportType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sample Data',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }

        renderGraph(); // Render initial chart

        reportTypeSelect.addEventListener('change', renderGraph);
    });

  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  // Add new task
  function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
      let taskItem = document.createElement("li");
      taskItem.classList.add("li-toDo");
      taskItem.innerText = taskText;
      taskItem.addEventListener("click", toggleTask);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
  }

  // Toggle task completion
  function toggleTask() {
    this.classList.toggle("completed");
  }

  // Clear all tasks
  function clearList() {
    taskList.innerHTML = "";
  }
