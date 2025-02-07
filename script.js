document.addEventListener("DOMContentLoaded", () => {
    const invoiceTable = document.getElementById("invoiceTable");
    const addItemBtn = document.getElementById("addItem");
    const grandTotal = document.getElementById("grandTotal");
    const darkModeToggle = document.createElement("button");
    
    darkModeToggle.textContent = "Toggle Dark Mode";
    darkModeToggle.id = "darkModeToggle";
    document.body.insertBefore(darkModeToggle, document.body.firstChild);
    
    function calculateTotal() {
        let total = 0;
        document.querySelectorAll("#invoiceTable tr").forEach(row => {
            const qty = row.querySelector(".qty").value;
            const price = row.querySelector(".price").value;
            const rowTotal = qty * price;
            row.querySelector(".total").textContent = rowTotal.toFixed(2);
            total += rowTotal;
        });
        grandTotal.textContent = total.toFixed(2);
    }

    // Add new row
    addItemBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" class="desc"></td>
            <td><input type="number" class="qty" value="1"></td>
            <td><input type="number" class="price" value="0"></td>
            <td class="total">0.00</td>
            <td><button class="remove">X</button></td>
        `;
        invoiceTable.appendChild(row);
        row.querySelector(".qty").addEventListener("input", calculateTotal);
        row.querySelector(".price").addEventListener("input", calculateTotal);
        row.querySelector(".remove").addEventListener("click", () => {
            row.remove();
            calculateTotal();
        });
    });

    // Update totals on input
    document.querySelectorAll(".qty, .price").forEach(input => {
        input.addEventListener("input", calculateTotal);
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Initial calculation
    calculateTotal();
});