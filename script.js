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



document.getElementById("downloadPDF").addEventListener("click", () => {
    const invoice = document.querySelector(".container");
    html2pdf().from(invoice).save("Invoice.pdf");
});


row.querySelector(".remove").addEventListener("click", () => {
    row.style.opacity = "0";
    setTimeout(() => {
        row.remove();
        calculateTotal();
    }, 300); // Delay for smooth effect
});



// Save invoice to localStorage
function saveInvoice() {
    const invoiceData = {
        company: document.getElementById("companyName").value,
        client: document.getElementById("clientName").value,
        invoiceNumber: document.getElementById("invoiceNumber").value,
        invoiceDate: document.getElementById("invoiceDate").value,
        items: []
    };

    document.querySelectorAll("#invoiceTable tr").forEach(row => {
        invoiceData.items.push({
            description: row.querySelector(".desc").value,
            quantity: row.querySelector(".qty").value,
            price: row.querySelector(".price").value
        });
    });

    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
}

// Load invoice from localStorage
function loadInvoice() {
    const savedInvoice = localStorage.getItem("invoiceData");
    if (savedInvoice) {
        const data = JSON.parse(savedInvoice);
        document.getElementById("companyName").value = data.company;
        document.getElementById("clientName").value = data.client;
        document.getElementById("invoiceNumber").value = data.invoiceNumber;
        document.getElementById("invoiceDate").value = data.invoiceDate;

        data.items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="text" class="desc" value="${item.description}"></td>
                <td><input type="number" class="qty" value="${item.quantity}"></td>
                <td><input type="number" class="price" value="${item.price}"></td>
                <td class="total">0.00</td>
                <td><button class="remove">X</button></td>
            `;
            document.getElementById("invoiceTable").appendChild(row);
        });

        calculateTotal();
    }
}

// Save invoice on input change
document.addEventListener("input", saveInvoice);

// Load invoice on page load
document.addEventListener("DOMContentLoaded", loadInvoice);
