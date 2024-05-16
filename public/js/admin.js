document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
  
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const clearListButton = document.getElementById("clearListButton");
    const taskList = document.getElementById("taskList");
  
    if (!taskInput || !addTaskButton || !clearListButton || !taskList) {
      console.error("One or more elements not found:", {
        taskInput,
        addTaskButton,
        clearListButton,
        taskList
      });
      return;
    }
  
    // Add new task
    function addTask() {
      console.log("Add Task button clicked");
      let taskText = taskInput.value.trim();
      if (taskText !== "") {
        let taskItem = document.createElement("li");
        taskItem.classList.add("li-toDo");
        taskItem.innerText = taskText;
        taskItem.addEventListener("click", toggleTask);
        taskList.appendChild(taskItem);
        taskInput.value = "";
        console.log("Task added:", taskText);
      }
    }
  
    // Toggle task completion
    function toggleTask() {
      console.log("Task toggled:", this.innerText);
      this.classList.toggle("completed");
    }
  
    // Clear all tasks
    function clearList() {
      console.log("Clear List button clicked");
      taskList.innerHTML = "";
    }
  
    // Event listeners
    addTaskButton.addEventListener("click", addTask);
    clearListButton.addEventListener("click", clearList);
  });
        

// document.addEventListener("DOMContentLoaded", function () {
//     const cardsContainer = document.getElementById(
//       "realtime-cards-container"
//     );

//     // Display real-time updates cards
//     updatesData.forEach((update) => {
//       const card = document.createElement("div");
//       card.classList.add("card-toDo");
//       card.innerHTML = `
//                 <h3>${update.type}</h3>
//                 <p>${update.count}</p>
//             `;
//       cardsContainer.appendChild(card);
//     });

//   });

//   let taskInput = document.getElementById("taskInput");
//   let taskList = document.getElementById("taskList");

//   // Add new task
//   function addTask() {
//     let taskText = taskInput.value.trim();
//     if (taskText !== "") {
//       let taskItem = document.createElement("li");
//       taskItem.classList.add("li-toDo");
//       taskItem.innerText = taskText;
//       taskItem.addEventListener("click", toggleTask);
//       taskList.appendChild(taskItem);
//       taskInput.value = "";
//     }
//   }

//   // Toggle task completion
//   function toggleTask() {
//     this.classList.toggle("completed");
//   }

//   // Clear all tasks
//   function clearList() {
//     taskList.innerHTML = "";
//   }
