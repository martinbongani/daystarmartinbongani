document.addEventListener('DOMContentLoaded', () => {
    const transactionForm = document.getElementById('transaction-form');
    const historyBody = document.getElementById('history-body');
    let transactions = [];

    // Function to add transaction to history
    function addTransaction(description, amount, type, date) {
        const transactionAmount = parseFloat(amount);
        const sign = (type === 'expense') ? '-' : '+';

        // Create new transaction object
        const transaction = {
            description,
            amount: transactionAmount,
            type,
            date,
            runningBalance: 0 // Running balance will be computed later
        };

        // Add transaction to array
        transactions.push(transaction);

        // Sort transactions by date (earliest to latest)
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Compute running balances from top to bottom
        let runningTotal = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'expense') {
                runningTotal -= transaction.amount;
            } else {
                runningTotal += transaction.amount;
            }
            transaction.runningBalance = runningTotal;
        });

        // Clear history body before re-rendering
        historyBody.innerHTML = '';

        // Render transactions in the table
        transactions.forEach((transaction) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.description}</td>
                <td>${sign}UGX ${transaction.amount.toLocaleString()}</td>
                <td>${transaction.type}</td>
                <td>${transaction.date}</td>
                <td>UGX ${transaction.runningBalance.toLocaleString()}</td>
            `;
            historyBody.appendChild(row);
        });
    }

    // Function to handle form submission
    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get input values
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;

        // Validate input
        if (!description || isNaN(amount) || !date) {
            alert('Please enter valid description, amount, and date.');
            return;
        }

        // Add transaction to history
        addTransaction(description, amount, type, date);

        // Clear input fields after submission
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';
    });
});
