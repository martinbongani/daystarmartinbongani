let resourceRequests = [
    {
        resourceNumber: "RR003",
        fullName: "Jane Doe",
        dateTime: "2024-04-17 10:30",
        items: [
            { item: "Crayons", quantity: 2, rate: 500 },
            { item: "Toys", quantity: 3, rate: 1000 }
        ]
    },
    {
        resourceNumber: "RR002",
        fullName: "John Smith",
        dateTime: "2024-04-16 15:45",
        items: [
            { item: "Books", quantity: 5, rate: 1500 }
        ]
    }
];

let currentRequest = null;
let editsMade = false;

function displayResourceLog() {
    const logContainer = document.getElementById("logContainer");
    logContainer.innerHTML = "";

    resourceRequests.forEach((request) => {
        const entry = document.createElement("div");
        entry.classList.add("resource-entry-resCheckAdmin");
        entry.innerHTML = `
            <strong>${request.resourceNumber}</strong> - ${request.fullName} (${request.dateTime})
        `;
        entry.addEventListener("click", () => {
            displayResourceDetails(request);
        });
        logContainer.prepend(entry);
    });
}

function displayResourceDetails(request) {
    const popup = document.getElementById("popup");
    const resourceDetails = document.getElementById("resourceDetails");
    resourceDetails.innerHTML = "";

    currentRequest = request;
    let totalAmount = 0;

    request.items.forEach((item, index) => {
        const amount = item.quantity * item.rate;
        totalAmount += amount;

        const detail = document.createElement("div");
        detail.innerHTML = `
            <input type="text" value="${item.item}" disabled>
            <input type="number" id="quantity-${index}" value="${item.quantity}" onchange="handleEditChange(${index})">
            <input type="number" id="rate-${index}" value="${item.rate}" onchange="handleEditChange(${index})">
            <span id="amount-${index}">Amount: UGX ${amount.toLocaleString()}</span>
        `;
        resourceDetails.appendChild(detail);
    });

    const totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = `Total Amount: UGX ${totalAmount.toLocaleString()}`;

    const approveButton = document.getElementById("approveButton");
    const rejectButton = document.getElementById("rejectButton");
    approveButton.disabled = false; // Enable approval/rejection by default
    rejectButton.disabled = false; // Enable approval/rejection by default

    const popupContent = document.querySelector(".popup-content-resCheckAdmin");
    popupContent.dataset.requestId = request.resourceNumber;

    popup.style.display = "block";
}

function handleEditChange(index) {
    editsMade = true;
    const saveButton = document.getElementById("saveButton");
    saveButton.style.display = "block";

    // Update amount for the edited item
    const quantity = parseInt(document.getElementById(`quantity-${index}`).value);
    const rate = parseFloat(document.getElementById(`rate-${index}`).value);
    const amount = quantity * rate;
    const amountElement = document.getElementById(`amount-${index}`);
    amountElement.textContent = `Amount: UGX ${amount.toLocaleString()}`;

    // Recalculate and update total amount
    let totalAmount = 0;
    currentRequest.items.forEach((item) => {
        const updatedAmount = item.quantity * item.rate;
        totalAmount += updatedAmount;
    });

    const totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = `Total Amount: UGX ${totalAmount.toLocaleString()}`;

    const approveButton = document.getElementById("approveButton");
    const rejectButton = document.getElementById("rejectButton");
    if (editsMade) {
        approveButton.disabled = true; // Disable approval/rejection until edits are saved
        rejectButton.disabled = true; // Disable approval/rejection until edits are saved
    } else {
        approveButton.disabled = false; // Enable approval/rejection if no edits are made
        rejectButton.disabled = false; // Enable approval/rejection if no edits are made
    }
}

function saveEdits() {
    if (currentRequest && editsMade) {
        currentRequest.items.forEach((item, index) => {
            item.quantity = parseInt(document.getElementById(`quantity-${index}`).value);
            item.rate = parseFloat(document.getElementById(`rate-${index}`).value);
        });

        editsMade = false;
        const saveButton = document.getElementById("saveButton");
        saveButton.style.display = "none";

        const approveButton = document.getElementById("approveButton");
        const rejectButton = document.getElementById("rejectButton");
        approveButton.disabled = false; // Enable approval/rejection after edits are saved
        rejectButton.disabled = false; // Enable approval/rejection after edits are saved

        // Recalculate and update total amount after saving edits
        let totalAmount = 0;
        currentRequest.items.forEach((item) => {
            const updatedAmount = item.quantity * item.rate;
            totalAmount += updatedAmount;
        });

        const totalAmountElement = document.getElementById("totalAmount");
        totalAmountElement.textContent = `Total Amount: UGX ${totalAmount.toLocaleString()}`;
    }
}

function approveRequest() {
    if (currentRequest) {
        alert(`Resource ${currentRequest.resourceNumber} Approved!`);
        removeResource(currentRequest);
        closePopup();
    }
}

function rejectRequest() {
    if (currentRequest) {
        alert(`Resource ${currentRequest.resourceNumber} Rejected!`);
        removeResource(currentRequest);
        closePopup();
    }
}

function removeResource(request) {
    const index = resourceRequests.indexOf(request);
    if (index !== -1) {
        resourceRequests.splice(index, 1);
        displayResourceLog();
    }
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

displayResourceLog();
